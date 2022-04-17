import { Account } from "./Account";
import { Page } from "./Page";
import { Uid } from "./Uid";
import { UidFactory } from "./UidFactory";
import { Video } from './Video'

class FakeUidFactory implements UidFactory {
    create() {
        return new Uid(new Date().toISOString());
    }
}

describe(Page.name, () => {
    let page: Page;
    const uidFactory = new FakeUidFactory();

    beforeEach(() => {
        const account = new Account();
        page = new Page(account);
    });
    
    it('Can upload a video', () => {
        const video = new Video(uidFactory.create());
        page.addVideo(video);
        expect(page.getVideoByUid(video.getUid())).toEqual(video);
    });

    it('Can update a video', () => {
        const video = new Video(uidFactory.create());
        page.addVideo(video);

        const newTitle = 'New title';
        video.setTitle(newTitle);
        page.updateVideo(video);
        expect(page.getVideoByUid(video.getUid()).getTitle()).toEqual(newTitle);
    });

    it('Can delete a video', () => {
        const video = new Video(uidFactory.create());
        page.addVideo(video);

        page.removeVideo(video);
        expect(page.getVideoByUid(video.getUid())).toBeUndefined();
    });
});