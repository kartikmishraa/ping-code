export interface Message {
  id?: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp?: Date;
  message?: string;
}
