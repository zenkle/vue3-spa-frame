<template>
  <div class="w-full h-full flex flex-col box-border p-4">
    <!-- 内容区域 -->
    <div class="w-full h-full overflow-hidden">
      <div v-for="(item, index) in 1000" :key="index">{{ item }}</div>
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

const inputTextString = ref("");
const refInputTextString =
  useTemplateRef<HTMLTextAreaElement>("refInputTextString");
const styleConfig = {
  "--n-border-radius": "20px",
  "--n-padding-left": "20px",
  "--n-padding-right": "20px",
  "--n-padding-vertical": "10px",
};

const handleSend = () => {
  console.log(inputTextString.value);
};
</script>
<style lang="scss" scoped></style>
