import * as rsa from "js-crypto-rsa";
import * as aes from "js-crypto-aes";

let encryptedAESKey;

// Generate RSA keys (for demonstration purposes; in practice, generate and distribute these securely)
const generateRSAKeyPair = async () => {
  // Generate RSA key pair
  const keyPair = await rsa.generateKey(2048); // RSA key size
  return {
    publicKey: keyPair.publicKey,
    privateKey: keyPair.privateKey,
  };
};

const rsaKeys = await generateRSAKeyPair();
const { publicKey, privateKey } = rsaKeys;

// Function to generate a new AES key
const generateAESKey = async () => {
  return aes.generateKey(256); // Generate a 256-bit AES key
};

// Function to encrypt data using AES
const encryptData = async (data, aesKey) => {
  const iv = aes.generateRandomIV();
  const encryptedData = await aes.encrypt(data, aesKey, iv);
  return { encryptedData, iv };
};

// Function to decrypt data using AES
const decryptData = async ({ encryptedData, iv }, aesKey) => {
  const decryptedData = await aes.decrypt(encryptedData, aesKey, iv);
  return decryptedData;
};

// Function to encrypt AES key using RSA
const encryptAESKeyWithRSA = async (aesKey) => {
  // Convert AES key to JWK format before encryption
  const aesKeyJwk = await aes.exportKey(aesKey);
  encryptedAESKey = await rsa.encrypt(aesKeyJwk, publicKey);
};

// Function to decrypt AES key using RSA
const decryptAESKeyWithRSA = async (encryptedAesKey) => {
  const decryptedKeyJwk = await rsa.decrypt(encryptedAesKey, privateKey);
  // Import the AES key from JWK format
  const decryptedKey = await aes.importKey(decryptedKeyJwk);
  return decryptedKey;
};

// Create a service object to encapsulate all functionalities
const MessageEncryptionService = {
  generateAESKey,
  encryptData,
  decryptData,
  encryptAESKeyWithRSA,
  decryptAESKeyWithRSA,
  getPublicKey: () => publicKey,
  getPrivateKey: () => privateKey,
  getEncryptedKey: () => encryptedAESKey,
};

export default MessageEncryptionService;
