declare global {
    namespace NodeJS {
        interface ProcessEnv {
            HTTP_EXPOSE_HOST: string;
            HTTP_EXPOSE_PORT: string;
            HTTP_BASE_URL: string;
            LINE_CHANNEL_ACCESS_TOKEN: string;
            LINE_CHANNEL_SECRET: string;
            LINE_CHAT_ROOM_ID: string;
            MATRIX_HOMESERVER_URL: string;
            MATRIX_ACCESS_TOKEN: string;
            MATRIX_DEVICE_NAME: string;
        }
    }
}

export {};
