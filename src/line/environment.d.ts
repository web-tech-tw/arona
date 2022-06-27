declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LINE_EXPOSE_HOST: string;
      LINE_EXPOSE_PORT: number;
      LINE_CHANNEL_ACCESS_TOKEN: string;
      LINE_CHANNEL_SECRET: string;
      LINE_CHAT_ROOM_ID: string;
    }
  }
}

export {
  
};
