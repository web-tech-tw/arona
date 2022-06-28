declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MATRIX_HOMESERVER_URL: string;
      MATRIX_ACCESS_TOKEN: string;
      MATRIX_CHAT_ROOM_ID: string;
      MATRIX_DEVICE_NAME: string;
    }
  }
}

export {

};
