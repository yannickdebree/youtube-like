import { Uid } from './Uid';

export class Video {
    private title: string;

    constructor(private uid: Uid) { }

    getUid() {
        return this.uid;
    }

    getTitle() {
        return this.title;
    }

    setTitle(title: string) {
        this.title = title;
    }
}