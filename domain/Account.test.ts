import { Account } from './Account'
import { Email } from './Email'
import { CommentFormatError } from './errors'
import { Page } from './Page'
import { Password } from './Password'
import { Reaction } from './Reaction'
import { Video } from './Video'
import { VideoComment } from './VideoComment'

describe(Account.name, () => {
    const email = new Email('test@test.com')
    const password = new Password('$testtest')
    const account = new Account(email, password)

    it('Can create a page', () => {
        new Page(account, 'Name')
    })

    it('Can react to a video', () => {
        const video = new Video(new Page(account, 'Name'))
        new Reaction(video, account, 'like')
    })

    it('Can comment a video', () => {
        const video = new Video(new Page(account, 'Name'))

        try {
            new VideoComment(video, account, '')
        } catch (err) {
            expect(err).toBeInstanceOf(CommentFormatError)
        }

        new VideoComment(video, account, 'This is a comment')
    })

    it.todo('Can react to a comment')

    it.todo('Can reply to a comment')

    it.todo('Can react to a comment reply')
})
