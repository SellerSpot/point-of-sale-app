declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            ENV: 'development' | 'production';
            APP_NAME: string;
            APP_VERSION: string;
            PORT: string;
            ONLINE_SERVER_API_URL: string;
            ONLINE_SERVER_SOCKET_URL: string;
            BASE_DOMAIN_NAME: string;
        }
    }
}

// convert it into a module by adding an empty export statement.
export {};
