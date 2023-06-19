import { Sheet, Typography } from "@mui/joy";
import { QueryFunction, useQuery } from "@tanstack/react-query";
import { api } from "../../../api";
import { ChatInput } from "../chat-input";
import { ChatMessage } from "./chat-message";
import { MessagesContainer } from "./messages-container";

export const ChatMessages = () => {
  // This is very inneficient
  // 1. We're fetching ALL messages
  // 2. We're re-fetching ALL messages on every new message
  // Ideally we would only fetch the last X messages on initial load and
  // then use the last message on the list as the cursor to fetch the next X messages

  // TODO: this is not working. Look into using useInfiniteQuery
  const {
    data: messages,
    isLoading,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: ["messages", {}],
    queryFn: getMessages,
  });

  const handleRefetchFromCursor = (messageID: number) => {
    refetchMessages(["messages", { cursor: messageID }]);
  };

  return (
    <Sheet
      variant="soft"
      sx={{ height: 1.0, display: "flex", flexDirection: "column" }}
    >
      <MessagesContainer>
        {isLoading && <Typography>Loading...</Typography>}
        {messages?.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </MessagesContainer>

      <ChatInput
        onSubmit={() =>
          handleRefetchFromCursor((messages || []).slice(-1)[0].id)
        }
      />
    </Sheet>
  );
};

const getMessages: QueryFunction<
  Message[],
  [string, { cursor?: number }]
> = async ({ queryKey }) => {
  const [_key, params] = queryKey;
  console.log(params, queryKey);
  return (await api.get("/messages", { params })).data;
};
