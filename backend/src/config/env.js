import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: process.env.PORT || 3050,
    HOST: process.env.HOST || '127.0.0.1',
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017",
    JWT_SECRET: process.env.JWT_SECRET || "some_secret_key",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "24h",
}