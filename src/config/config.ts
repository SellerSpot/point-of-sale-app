export const CONFIG = {
    ENV: process.env.ENV, //Development | Production
    ONLINE_SERVER_API_URL: process.env.ONLINE_SERVER_API_URL,
    ONLINE_SERVER_SOCKET_URL: process.env.ONLINE_SERVER_SOCKET_URL,
    LANDING_APP_URL: process.env.LANDING_APP_URL,

    // REDUX PERSIST STATE
    REUDX_CORE_STATE: 'coreState',
    APP_LOCATION: 'appLocation',
};
// For any url do not suffix '/' (standard followd in this project) (nest / at use time if needed )
