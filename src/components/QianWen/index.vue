<template>
  <div class="w-full h-full flex flex-col box-border p-4">
    <!-- 内容区域 -->
    <div class="w-full h-full overflow-y-auto">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="mb-4 flex"
        :class="{
          'justify-end': msg.role === 'user',
        }"
      >
        <div v-if="msg.role === 'user'" class="message-user">
          {{ msg.content }}
        </div>
        <div v-if="msg.role === 'assistant'">
          <div v-if="isTyping" class="g-placeholder">thinking...</div>
          <div v-if="msg.content" class="message-assistant">
            <Markdown :content="msg.content"></Markdown>
            <!-- <MarkdownPreview
          v-model:reader="outputTextReader"
          :model="assistantStore.currentModelItem?.model"
          :transform-stream-fn="
            assistantStore.currentModelItem?.transformStreamValue
          "
        /> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 输入框区域 -->
    <div class="w-full relative">
      <n-input
        ref="refInputTextString"
        v-model:value="inputTextString"
        class="textarea-resize-none"
        placeholder="请提问"
        type="textarea"
        autofocus
        h-full
        :style="styleConfig"
      />
      <div class="absolute bottom-2 right-2">
        <n-button type="info" circle @click="handleSend">
          <n-icon>
            <ArrowUp />
          </n-icon>
        </n-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ArrowUp } from "@vicons/ionicons5";
import { useAssistantStore } from "@/stores/assistant";
import { messagesStore } from "@/stores/messages";
import Markdown from "./markdown/index.vue";

const styleConfig = {
  "--n-border-radius": "20px",
  "--n-padding-left": "20px",
  "--n-padding-right": "20px",
  "--n-padding-vertical": "10px",
};

const assistantStore = useAssistantStore();
const { messages, addMessage } = messagesStore();

const inputTextString = ref("");
const refInputTextString =
  useTemplateRef<HTMLTextAreaElement>("refInputTextString");

let isTyping = ref(false);

// 打字机效果：逐块读取流并更新内容
const typewriterEffect = async (
  reader: ReadableStreamDefaultReader<string>,
  messageIndex: number,
) => {
  let accumulatedContent = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    if (value) {
      accumulatedContent += value;
      // 实时更新消息内容
      messages[messageIndex].content = accumulatedContent;
    }
  }
};

const handleSend = async () => {
  const textContent = inputTextString.value?.trim() || "";
  if (!textContent) {
    return;
  }
  isTyping.value = true;
  inputTextString.value = "";

  addMessage({
    id: Date.now(),
    role: "user",
    content: textContent,
  });

  addMessage({
    id: Date.now(),
    role: "assistant",
    content: "",
  });

  const messageIndex = messages.length - 1;

  const { error, reader } = await assistantStore.assistantRequest({
    text: textContent,
  });

  if (error) {
    messages[messageIndex].content = "请求失败，请重试";
    isTyping.value = false;
    return;
  }

  if (reader) {
    await typewriterEffect(reader, messageIndex);
    isTyping.value = false;
  }
};
</script>
<style lang="scss" scoped>
.message-user {
  box-sizing: border-box;
  display: inline-block;
  padding: 10px 20px;
  background-color: #e6f7ff;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
.message-assistant {
  box-sizing: border-box;
  display: inline-block;
  padding: 10px 20px;
  background-color: #f4f4f4;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
@keyframes blink-fade {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
.g-placeholder {
  color: #666;
  animation: blink-fade 1.2s infinite ease-in-out;
}
</style>
