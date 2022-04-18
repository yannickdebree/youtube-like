import { Page } from './Page';
import { Uid } from './Uid';

export class Video {
    private uid?: Uid;
    private path?: string;
    private name?: string;
    private description?: string;

    constructor(private page: Page) { }

    getUid() {
        return this.uid
    }

    getName() {
        return this.name;
    }

    setUid(uid: Uid) {
        this.uid = uid
    }

    setPath(path: string) {
        this.path = path;
    }

    setName(name: string) {
        this.name = name;
    }

    setDescription(description: string) {
        this.description = description;
    }
}
