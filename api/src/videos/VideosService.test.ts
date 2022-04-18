import { Account, Email, Page, Password } from '../../../domain'
import { UploadVideoDTO } from './UploadVideoDTO'
import { VideosService } from './VideosService'

describe(VideosService.name, () => {
    const videosService = new VideosService()

    it('Can persist data', () => {
        const page = new Page(
            new Account(
                new Email('test@test.com'),
                new Password('$testtest')
            ), 'Page'
        );
        const dto = new UploadVideoDTO({ path: '/tmp', page })
        const uid = videosService.create(dto)
        expect(videosService.findByUid(uid)).toBeDefined()
    })
})
