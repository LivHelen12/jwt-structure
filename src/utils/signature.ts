import { createHmac } from "crypto";

interface IGenerateSignatureOptions {
  secret: string;
  header: string;
  payload: string;
}

export function generateSignature({
  header,
  payload,
  secret,
}: IGenerateSignatureOptions) {
  const hmac = createHmac("sha256", secret);
  return hmac.update(`${header}.${payload}`).digest("base64url");
}
