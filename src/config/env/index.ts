import { config } from "dotenv";
config();

export type envKey =
"PORT" | "NODE_ENV" | "DB_HOST" | "DB_PORT" | "DB_USER" | "DB_PASSWORD" | "DB_NAME"
;

export async function checkEnv() {
  const requiredKeys: envKey[] = ["PORT"];
  const missingKeys: envKey[] = [];

  // Check if any of the required environment variables are missing
  for (const key of requiredKeys) {
    if (!process.env[key]) {
      missingKeys.push(key);
    }
  }

  // If there are missing keys, throw an error
  if (missingKeys.length > 0) {
    throw new Error(`Missing environment variables: ${missingKeys.join(", ")}`);
  }
}

// Function to fetch environment variables with type safety
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const envConfig = <T>(key: envKey): T => {
  const env = process.env[key];

  if (typeof env === "undefined" && process.env.NODE_ENV === "development") {
    throw new Error(`${key} is not defined`);
  }

  return env as T;
};

export const isLocalDevEnv = () => process.env.NODE_ENV === "development";