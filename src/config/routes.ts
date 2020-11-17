const inferRouteTypes = <T extends { [key: string]: string }>(arg: T): T => arg; // infering types from Route object with autocomplete support.

export const ROUTES = inferRouteTypes({
    HOME: '/home',
});
