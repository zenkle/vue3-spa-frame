import { mockEventStreamText } from "../data";
function sleep(time = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({});
    }, time);
  });
}
type ContentResult =
  | {
      content: any;
    }
  | {
      done: boolean;
    };
export type TransformFunc = (
  readValue: Uint8Array | string,
  textDecoder: TextDecoder,
) => ContentResult;

export const defaultMockModelName = "standard";
export const defaultModelName = defaultMockModelName;
interface TypesModelLLM {
  label: string;
  modelName: string;
  transformStreamValue: TransformFunc;
  chatFetch: (text: string) => Promise<Response>;
}

export const modelMappingList: TypesModelLLM[] = [
  {
    label: "mock数据",
    modelName: "standard",
    transformStreamValue(readValue, textDecoder) {
      let content = "";
      if (readValue instanceof Uint8Array) {
        content = textDecoder.decode(readValue, {
          stream: true,
        });
      } else {
        content = readValue;
      }
      return { content };
    },
    async chatFetch(): Promise<Response> {
      const mockData = new ReadableStream({
        async start(controller) {
          // 打字机效果：逐块发送
          const text = mockEventStreamText;
          const chunkSize = 3; // 每次发送的字符数
          const delay = 20; // 每次发送的延迟(毫秒)

          for (let i = 0; i < text.length; i += chunkSize) {
            const chunk = text.slice(i, i + chunkSize);
            controller.enqueue(new TextEncoder().encode(chunk));
            await sleep(delay);
          }
          controller.close();
        },
      });
      await sleep(500);
      return new Promise((resolve) => {
        resolve({
          body: mockData,
        } as Response);
      });
    },
  },
];
