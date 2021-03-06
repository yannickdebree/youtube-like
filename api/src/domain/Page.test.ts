import { Account } from './Account'
import { Email } from './Email'
import { Page } from './Page'
import { Password } from './Password'
import { Video } from './Video'

describe(Page.name, () => {
    const page = new Page(
        new Account(new Email('test@test.com'), new Password('$testtest')),
        'Name'
    )

    it('Can upload a video', () => {
        new Video(page, '/tmp/1.mp4')
    })

    it('Can update a video', () => {
        const video = new Video(page, '/tmp/2.mp4')
        const newName = 'New title'
        video.setName(newName)
        expect(video.getName()).toEqual(newName)
    })

    it.todo('Can remove a video')
})
