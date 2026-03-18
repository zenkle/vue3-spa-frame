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
        start(controller) {
          mockEventStreamText.split("\n").forEach((line: any) => {
            controller.enqueue(new TextEncoder().encode(`${line}\n`));
          });
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
