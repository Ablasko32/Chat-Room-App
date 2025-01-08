const VITE_SECRET = import.meta.env.VITE_SECRET;

if (!window.crypto.subtle) {
  throw new Error(
    "FATAL: The crypto API is not available in this environment.Check if using HTTPS!"
  );
}

async function deriveKey(secret) {
  const encoder = new TextEncoder();
  const data = encoder.encode(secret + VITE_SECRET);
  const hash = await window.crypto.subtle.digest("SHA-256", data);
  return new Uint8Array(hash);
}

async function createAesKey(secret) {
  const value = await deriveKey(secret);
  const key = await window.crypto.subtle.importKey(
    "raw",
    value,
    { name: "AES-CBC", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
  return key;
}

export async function encrypt(message, secret) {
  const key = await createAesKey(secret);
  const encoder = new TextEncoder();
  const iv = window.crypto.getRandomValues(new Uint8Array(16));

  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv,
    },
    key,
    encoder.encode(message)
  );

  return { encrypted, iv };
}

export async function decrypt(cipher, secret, iv) {
  const key = await createAesKey(secret);
  const decoder = new TextDecoder();

  const decrypt = await window.crypto.subtle.decrypt(
    {
      name: "AES-CBC",
      iv,
    },
    key,
    cipher
  );

  const message = decoder.decode(decrypt);

  return message;
}
