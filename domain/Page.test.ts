import { Account } from "./Account";
import { Page } from "./Page";
import { Video } from './Video';

describe(Page.name, () => {
    const page = new Page(new Account());

    it('Can upload a video', () => {
        new Video(page);
    });

    it('Can update a video', () => {
        const video = new Video(page);
        const newTitle = 'New title';
        video.setTitle(newTitle);
        expect(video.getTitle()).toEqual(newTitle);
    });

    it.todo('Can remove a video');
});