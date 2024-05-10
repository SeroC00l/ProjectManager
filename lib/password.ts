import crypto from "crypto"

export function generateHash(password: string): string {
    const secret = "sero_cool";
    const hash = crypto
      .createHmac("sha256", secret)
      .update(password)
      .digest("hex");
    return hash;
  }