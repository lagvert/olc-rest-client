import { EmailOptions } from "./EmailOptions";
export type EmailSmtpOptions = EmailOptions & Partial<Record<"sender" | "senderName" | "user" | "password" | "host", string> & Record<"useAuth" | "useStartTLS" | "useSender", boolean>>;
