import jscu from "js-crypto-utils";

const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8");

// Initialize RSA and AES keys
let publicKey, privateKey, aesKey, encryptedAESKey;
let initializationPromise;

const initializeKeys = async () => {
  const rsaKeys = await generateRSAKeyPair();

  publicKey = rsaKeys.publicKey;
  privateKey = rsaKeys.privateKey;
  aesKey = await generateAESKey(); // Initialize AES key
  encryptedAESKey = await jscu.pkc.encrypt(aesKey, publicKey, {
    hash: "SHA-256",
  });
};

// Generate RSA keys and convert them to jscu.Key objects
const generateRSAKeyPair = async () => {
  const keys = await jscu.pkc.generateKey("RSA", { modulusLength: 2048 });
  const publicKey = new jscu.Key("jwk", await keys.publicKey.export("jwk"));
  const privateKey = new jscu.Key("jwk", await keys.privateKey.export("jwk"));

  return {
    publicKey,
    privateKey,
  };
};

// Ensure the keys are initialized before using the service
const ensureInitialized = async () => {
  if (!initializationPromise) {
    initializationPromise = initializeKeys().catch((error) => {
      console.error("Failed to initialize keys:", error);
      initializationPromise = null;
      throw error;
    });
  }

  return initializationPromise;
};

// Function to generate a new AES key
const generateAESKey = async () => {
  const aesKey = jscu.random.getRandomBytes(32); // Generate a 256-bit AES key
  return aesKey;
};

// Function to encrypt data using AES
const encryptData = async (data) => {
  await ensureInitialized();

  const encodedData = encoder.encode(data);
  const iv = jscu.random.getRandomBytes(12); // AES-GCM requires a 12-byte IV
  const encryptedData = await jscu.aes.encrypt(encodedData, aesKey, {
    encrypt: "AES-GCM",
    iv,
  });

  return { encryptedData, iv };
};

// Function to decrypt data using AES
const decryptData = async ({ encryptedData, iv }) => {
  await ensureInitialized();

  const decryptedData = await jscu.aes.decrypt(encryptedData, aesKey, {
    encrypt: "AES-GCM",
    iv,
  });
  const decodedData = decoder.decode(decryptedData);

  return decodedData;
};

// Function to encrypt AES key using RSA
const encryptAESKeyWithRSA = async () => {
  await ensureInitialized();
  const encryptedAESKey = await jscu.pkc.encrypt(aesKey, publicKey, {
    hash: "SHA-256",
  });
  return encryptedAESKey;
};

// Function to decrypt AES key using RSA
const decryptAESKeyWithRSA = async (encryptedAESKey) => {
  await ensureInitialized();

  const decryptedKey = await jscu.pkc.decrypt(encryptedAESKey, privateKey, {
    hash: "SHA-256",
  });

  return decryptedKey;
};

// Create a service object to encapsulate all functionalities
const MessageEncryptionService = {
  encryptData,
  decryptData,
  encryptAESKeyWithRSA,
  decryptAESKeyWithRSA,
  getPublicKey: async () => {
    await ensureInitialized();
    return publicKey;
  },
  getPrivateKey: async () => {
    await ensureInitialized();
    return privateKey;
  },
  getAESKey: async () => {
    await ensureInitialized();
    return aesKey;
  },
  getEncryptedAESKey: async () => {
    await ensureInitialized();
    return encryptedAESKey.data;
  },
};

export default MessageEncryptionService;
