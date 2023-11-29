import { consumeImageNano } from "@/v1/services/media.service";

export const consumeMediaToken = async (
  ...tokens: (string | null | undefined)[]
) => {
  const ids: (number | null)[] = [];

  for (const token of tokens) {
    if (!token) ids.push(null);
    else ids.push(await consumeImageNano(token));
  }

  return ids;
};
