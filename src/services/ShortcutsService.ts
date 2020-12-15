const inferShortcutTypes = <T extends { [key: string]: string }>(arg: T): T => arg;

export const SHORTCUTS = inferShortcutTypes({
    NEWSALE: 'F1',
});
