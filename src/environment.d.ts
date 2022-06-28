declare global {
    namespace NodeJS {
        interface ProcessEnv {
            HTTP_EXPOSE_HOST: string;
            HTTP_EXPOSE_PORT: string;
        }
    }
}

export {

};
