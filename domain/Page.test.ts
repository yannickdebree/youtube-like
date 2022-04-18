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
        new Video(page)
    })

    it('Can update a video', () => {
        const video = new Video(page)
        const newName = 'New title'
        video.setName(newName)
        expect(video.getName()).toEqual(newName)
    })

    it.todo('Can remove a video')
})
