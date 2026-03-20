// 类型定义
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

// 聊天请求参数
interface ChatRequestParams {
  conversationId?: string;
}

// 模型配置接口
interface TypesModelLLM {
  label: string;
  modelName: string;
  apiEndpoint?: string;
  transformStreamValue: TransformFunc;
  chatFetch: (text: string, params?: ChatRequestParams) => Promise<Response>;
}

// API 基础配置 - 开发环境使用代理，生产环境使用完整URL
const API_BASE_URL = import.meta.env.DEV
  ? ""
  : import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// 获取请求头
function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

// 默认模型
export const defaultModelName = "qwen-max";

export const modelMappingList: TypesModelLLM[] = [
  // 千问-Turbo 模型 - 后端流式接口（默认）
  {
    label: "通义千问 Turbo",
    modelName: "qwen",
    apiEndpoint: "/api/qwen/stream",
    transformStreamValue(readValue, textDecoder) {
      let content = "";
      if (readValue instanceof Uint8Array) {
        content = textDecoder.decode(readValue, { stream: true });
      } else {
        content = readValue;
      }
      return { content };
    },
    async chatFetch(text: string): Promise<Response> {
      const response = await fetch(`${API_BASE_URL}/api/qwen/stream`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          model: "qwen-turbo",
          messages: [{ role: "user", content: text }],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    },
  },

  // 千问-Plus 模型 - 后端流式接口
  {
    label: "通义千问 Plus",
    modelName: "qwen-plus",
    apiEndpoint: "/api/qwen/stream",
    transformStreamValue(readValue, textDecoder) {
      let content = "";
      if (readValue instanceof Uint8Array) {
        content = textDecoder.decode(readValue, { stream: true });
      } else {
        content = readValue;
      }
      return { content };
    },
    async chatFetch(text: string): Promise<Response> {
      const response = await fetch(`${API_BASE_URL}/api/qwen/stream`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          model: "qwen-plus",
          messages: [{ role: "user", content: text }],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    },
  },

  // 千问-Max 模型 - 后端流式接口
  {
    label: "通义千问 Max",
    modelName: "qwen-max",
    apiEndpoint: "/api/qwen/stream",
    transformStreamValue(readValue, textDecoder) {
      let content = "";
      if (readValue instanceof Uint8Array) {
        content = textDecoder.decode(readValue, { stream: true });
      } else {
        content = readValue;
      }
      return { content };
    },
    async chatFetch(text: string): Promise<Response> {
      const response = await fetch(`${API_BASE_URL}/api/qwen/stream`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          model: "qwen-max",
          messages: [{ role: "user", content: text }],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    },
  },
];
