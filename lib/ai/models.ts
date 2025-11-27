export const DEFAULT_CHAT_MODEL: string = "chat-model";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "chat-model",
    name: "deepseek chat",
    description: "Fast and efficient text-based conversational model",
  },
  {
    id: "chat-model-reasoning",
    name: "deepseek reasoning",
    description:
      "Uses advanced chain-of-thought reasoning for complex problems",
  },
];
