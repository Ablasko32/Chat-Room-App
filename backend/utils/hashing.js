import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

export async function generatePasswordHash(plainText) {
  const hashed = await bcrypt.hash(plainText, SALT_ROUNDS);
  return hashed;
}

export async function checkPaswword(hash, plainText) {
  const isValid = await bcrypt.compare(plainText, hash);
  return isValid;
}
