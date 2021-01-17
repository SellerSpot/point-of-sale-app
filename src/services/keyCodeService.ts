interface IKeyCodes {
    NEWSALE: string;
    ADDCATEGORY: string;
}

export default class KeyCodeService {
    private keyCodes: IKeyCodes;

    constructor() {
        this.keyCodes = {
            NEWSALE: 'F1',
            ADDCATEGORY: 'Alt+C',
        };
    }

    // To get all the keycodes
    public getKeyCodes(command: keyof IKeyCodes): string {
        return this.keyCodes[command];
    }
}
