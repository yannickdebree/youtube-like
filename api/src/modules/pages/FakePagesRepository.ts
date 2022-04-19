import { Page, PagesRepository, Uid } from "../../../../domain";

export class FakePagesRepository implements PagesRepository {
    private pages = new Array<Page>();

    save(page: Page) {
        this.pages.push(page);
        return Promise.resolve();
    }

    async findByUid(uid: Uid) {
        await Promise.resolve();
        return this.pages.find(page => page.getUid()?.isEquals(uid));
    }
}