interface User {
  id: number;
  email: string;
  username: string;
  discriminator: number;
}

interface Message {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Channel {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
