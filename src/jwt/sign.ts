import { createHmac } from "node:crypto";
import { generateSignature } from "../utils/signature";
import { encoded } from "../utils/serialized";

interface ISignOptions {
  data: Record<string, any>;
  exp: number;
  secret: string;
}

export function sign({ data, exp, secret }: ISignOptions) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    ...data,
    iat: Date.now(),
    exp: exp,
  };

  const encodedHeader = encoded({ data: header });
  const encodedPayload = encoded({ data: payload });

  const signature = generateSignature({
    header: encodedHeader,
    payload: encodedPayload,
    secret: secret,
  });

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}
