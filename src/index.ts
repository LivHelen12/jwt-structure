import "dotenv/config";

import { verify } from "./jwt/verify";
import { sign } from "./jwt/sign";

const secret = process.env.JWT_SECRET as string;

const token = sign({
  exp: Date.now() + 24 * 60 * 60 * 1000,
  data: {
    sub: "John Doe",
  },
  secret,
});

const decoded = verify({
  token,
  secret,
});

console.log(decoded);
