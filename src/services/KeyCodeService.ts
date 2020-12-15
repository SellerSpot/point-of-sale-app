const inferKeyCodeTypes = <T extends { [key: string]: string }>(arg: T): T => arg;

export const KEYCODES = inferKeyCodeTypes({
    NEWSALE: 'F1',
    ADDCATEGORY: 'Alt+C',
});
