import { Paper, Typography } from "@mui/material";
import {
  QueryFunction,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { api, wss } from "../../../../api";
import { ChatInput } from "../../chat-input";
import { ChatMessage } from "./chat-message";
import { MessagesContainer } from "./messages-container";

export const ChatMessages = () => {
  const { channelId } = useParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = wss.subscriptions.create("ChatChannel", {
      received: (data) => {
        console.log("New message received", data);
        queryClient.setQueriesData(["messages", channelId], (prev: any) => {
          if (!prev) return prev;

          return {
            ...prev,
            pages: [
              {
                ...prev.pages[0],
                data: [JSON.parse(data), ...prev.pages[0].data],
              },
              ...prev.pages.slice(1),
            ],
          };
        });
      },
      connected: () => {
        console.log("Connected to chat");
      },
    });

    return () => {
      channel.unsubscribe();
    };
  }, [queryClient, channelId]);

  const {
    data: messages,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    enabled: !!channelId,
    queryKey: ["messages", channelId],
    queryFn: getMessages,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
  });
  const flatMessages = useMemo(
    () => messages?.pages.flatMap((page) => page.data) ?? [],
    [messages]
  );

  const hasOldestMessage = messages?.pages.slice(-1)[0].nextCursor === null;
  const fetchMoreOnTopReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
        if (
          !isFetchingNextPage &&
          !hasOldestMessage &&
          scrollHeight + scrollTop - clientHeight < 300
        ) {
          fetchNextPage();
        }
      }
    },
    [isFetchingNextPage, fetchNextPage, hasOldestMessage]
  );
  const debouncedFetchMoreOnTopReached = useCallback(
    debounce(fetchMoreOnTopReached, 250),
    [fetchMoreOnTopReached]
  );

  return (
    <Paper
      sx={{
        height: 1.0,
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
      }}
    >
      <MessagesContainer
        onScroll={(e) =>
          debouncedFetchMoreOnTopReached(e.target as HTMLDivElement)
        }
      >
        {isLoading && <Typography>Loading...</Typography>}
        {flatMessages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.content}
            timestamp={message.createdAt}
            username={message.author.username}
          />
        ))}
      </MessagesContainer>

      <ChatInput />
    </Paper>
  );
};

const getMessages: QueryFunction<{
  data: MessageData[];
  nextCursor?: number;
}> = async ({ pageParam, queryKey }) =>
  (
    await api.get("/messages", {
      params: { cursor: pageParam, channelId: queryKey[1] },
    })
  ).data;

type MessageData = Message & { author: Pick<User, "id" | "username"> };
