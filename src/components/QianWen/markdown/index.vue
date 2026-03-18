<template>
  <div v-html="htmlContent"></div>
</template>
<script setup lang="ts">
import { renderMarkdown } from "./plugins";
const props = defineProps({
  content: {
    type: String,
    default: "",
  },
});
const htmlContent = ref<string>("");

const renderContent = async (text: string) => {
  htmlContent.value = renderMarkdown(text);
};
if (props.content) {
  renderContent(props.content);
}
</script>
