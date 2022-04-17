import { Account } from './Account';
import { EmptyCommentError } from './errors';
import { Page } from './Page';
import { Reaction } from './Reaction';
import { Video } from './Video';
import { VideoComment } from './VideoComment';

describe(Account.name, () => {
    const account = new Account();

    it('Can create a page', () => {
        new Page(account);
    });

    it('Can react to a video', () => {
        const video = new Video(new Page(new Account()));
        new Reaction(video, account, 'like');
    });

    it('Can comment a video', () => {
        const video = new Video(new Page(new Account()));
        try {
            new VideoComment(video, account, '')
        } catch (err) {
            expect(err).toBeInstanceOf(EmptyCommentError);
        }

        new VideoComment(video, account, 'This is a comment')
    });

    it.todo('Can react to a comment');

    it.todo('Can reply to a comment');

    it.todo('Can react to a comment reply');

})