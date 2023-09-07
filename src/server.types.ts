export type Profile = {
  id: string;
  name: string;
  email: string;
  signUpDate: unknown;
};

export type User = {
  id: string;
  name: string;
};

export type Message = {
  id: string;
  author: User;
  chatId: string;
  date: Date;
  content: string;
};

export type SendMessageData = {
  recipientIds: string[];
  authorId: string;
  content: string;
};

export type GetMessagesArgs = {
  userIds: string[];
};
