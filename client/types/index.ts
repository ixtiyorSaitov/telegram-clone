export interface IUser {
  email: string;
  _id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  bio: string;
  isVerified: boolean;
  muted: boolean;
  notificationSound: string;
  lastMessage: IMessage;
  sendingSound: string;
  contacts: IUser[];
}

export interface IError extends Error {
  response: { data: { message: string } };
}

export interface ChildProps {
  children: React.ReactNode;
}

export interface IMessage {
  _id: string;
  text: string;
  image: string;
  reaction: string;
  sender: IUser;
  receiver: IUser;
  createdAt: string;
  updatedAt: string;
}
