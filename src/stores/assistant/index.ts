import { defineStore } from "pinia";
import {
  defaultModelName,
  modelMappingList,
} from "../../components/QianWen/models";

export const useAssistantStore = defineStore("assistant", {
  state: () => ({
    systemModelName: defaultModelName,
  }),
  getters: {
    currentModelItem(state) {
      return modelMappingList.find(
        (v: { modelName: string }) => v.modelName === state.systemModelName,
      );
    },
  },
  actions: {
    assistantRequest(data: { text: string }) {
      return this.createAssistantWriterStylized(data);
    },
    async createAssistantWriterStylized(data: { text: string }): Promise<{
      error: number;
      reader: ReadableStreamDefaultReader<string> | null;
    }> {
      return new Promise((resolve) => {
        if (!this.currentModelItem?.chatFetch) {
          resolve({
            error: 1,
            reader: null,
          });
        }
        this.currentModelItem
          ?.chatFetch(data.text)
          .then((res: { body: any }) => {
            if (res.body) {
              // 直接读取字符块，实现打字机效果
              const reader = res.body
                .pipeThrough(new TextDecoderStream())
                .getReader();
              resolve({
                error: 0,
                reader,
              });
            } else {
              resolve({
                error: 1,
                reader: null,
              });
            }
          })
          .catch(() => {
            resolve({
              error: 1,
              reader: null,
            });
          });
      });
    },
  },
});
