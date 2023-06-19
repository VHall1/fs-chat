interface User {
  id: number;
  email: string;
  username: string;
  discriminator: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Message {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
