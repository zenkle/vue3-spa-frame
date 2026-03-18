/**
 * 创建一个 TransformStream，按指定分隔符分割流数据
 */
export function splitStream(
  delimiter: string,
): TransformStream<string, string> {
  let buffer = "";

  return new TransformStream<string, string>({
    transform(chunk, controller) {
      buffer += chunk;
      const parts = buffer.split(delimiter);
      // 保留最后一个未完成的部分
      buffer = parts.pop() || "";

      for (const part of parts) {
        if (part) {
          controller.enqueue(part + delimiter);
        }
      }
    },
    flush(controller) {
      if (buffer) {
        controller.enqueue(buffer);
      }
    },
  });
}
