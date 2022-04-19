import 'reflect-metadata'
import Container from 'typedi'
import { Account, Email, Page, Password } from '../../../../domain'
import { VIDEOS_REPOSITORY } from '../../utils/services-tokens'
import { FakeVideosRepository } from './FakeVideosRepository'
import { UploadVideoDTO } from './UploadVideoDTO'
import { VideosService } from './VideosService'

describe(VideosService.name, () => {
    Container.set(VIDEOS_REPOSITORY, new FakeVideosRepository());
    const videosService = Container.get(VideosService);

    it('Can persist data', async () => {
        const page = new Page(
            new Account(
                new Email('test@test.com'),
                new Password('$testtest')
            ), 'Page'
        );
        const dto = new UploadVideoDTO({ path: '/tmp', page, name: "Name", description: "Description" })
        const uid = await videosService.create(dto);
        const video = await videosService.findByUid(uid);
        expect(video).toBeDefined()
        expect(video?.getName()).toBe("Name")
        expect(video?.getDescription()).toBe("Description")
    })
})
