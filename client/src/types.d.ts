interface User {
  id: string;
  email: string;
  username: string;
  discriminator: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Message {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Channel {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
