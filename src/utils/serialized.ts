interface IEncoded {
  data: Record<string, any>;
}

export function encoded({ data }: IEncoded) {
  return Buffer.from(JSON.stringify(data)).toString("base64url");
}

interface IDecoded {
  data: string;
}

export function decoded({ data }: IDecoded) {
  return JSON.parse(Buffer.from(data, "base64url").toString("utf-8"));
}
