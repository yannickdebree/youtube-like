import 'reflect-metadata'
import Container from 'typedi'
import { Email } from '../../domain'
import { declareProvidersForTestServices } from '../../utils/providers'
import { AccountsService } from '../accounts'
import { CreateAccountDTO } from '../accounts/CreateAccountDTO'
import { PagesService } from '../pages'
import { CreatePageDTO } from '../pages/CreatePageDTO'
import { UploadVideoDTO } from './UploadVideoDTO'
import { VideosService } from './VideosService'

describe(VideosService.name, () => {
    declareProvidersForTestServices();

    const accountsService = Container.get(AccountsService);
    const pagesService = Container.get(PagesService);
    const videosService = Container.get(VideosService);

    it('Can persist data', async () => {
        const email = new Email('videos2@service.com');
        await accountsService.create(new CreateAccountDTO({
            email: email.getValue(),
            password: '$testtest'
        }));
        const account = await accountsService.findByEmail(email);
        const pageUid = await pagesService.create(new CreatePageDTO({
            account,
            name: 'Page'
        }));
        const page = await pagesService.findByUid(pageUid);
        const dto = new UploadVideoDTO({ path: '/tmp', page, name: "Name", description: "Description" })
        const uid = await videosService.create(dto);
        const video = await videosService.findByUid(uid);
        expect(video.getUid().isEquals(uid)).toBe(true)
        expect(video.getPath()).toBe(dto.path)
        expect(video.getPage().getUid().isEquals(page.getUid())).toBe(true);
        expect(video?.getName()).toBe(dto.name)
        expect(video?.getDescription()).toBe(dto.description)
    })
})
