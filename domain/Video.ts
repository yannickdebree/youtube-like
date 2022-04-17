import { Page } from './Page';

export class Video {
    private title: string;

    constructor(private page: Page) { }

    getTitle() {
        return this.title;
    }

    setTitle(title: string) {
        this.title = title;
    }
}