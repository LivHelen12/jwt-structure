import { generateSignature } from "../utils/signature";
import { decoded } from "../utils/serialized";

interface IVerifyOptions {
  token: string;
  secret: string;
}

export function verify({ token, secret }: IVerifyOptions) {
  const [headerSent, payloadSent, signatureSent] = token.split(".");

  const signature = generateSignature({
    header: headerSent,
    payload: payloadSent,
    secret,
  });

  if (signature !== signatureSent) {
    throw new Error("Invalid JWT Token");
  }

  const decodedPayload = decoded({ data: payloadSent });

  if (decodedPayload.exp < Date.now()) {
    throw new Error("Expired JWT Token");
  }

  return decodedPayload;
}
