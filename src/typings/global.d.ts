declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV: 'development' | 'production';
            PORT?: string;
            PWD: string;
            APP_NAME?: string;
            APP_VERSION?: string;
        }
    }
}

// Convert it into a module by adding an empty export statement.
export {};
