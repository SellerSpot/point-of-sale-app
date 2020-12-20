export {};
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

// fileextension support type declaration
// export declare module '*.module.css';
// export declare module '*.png';

// convert it into a module by adding an empty export statement.
