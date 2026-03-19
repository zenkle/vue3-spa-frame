import { defineStore } from "pinia";

interface Message {
  id: number;
  role: string;
  content: string;
}

export const messagesStore = defineStore("useMessagesStore", () => {
  const messages = ref<Message[]>([]);
  const addMessage = (message: Message) => {
    messages.value.push(message);
  };
  return {
    messages,
    addMessage,
  };
});
