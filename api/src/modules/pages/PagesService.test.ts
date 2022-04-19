import "reflect-metadata"
import Container from 'typedi'
import { Account, Email, Password } from '../../../../domain'
import { PAGES_REPOSITORY } from '../../utils/services-tokens'
import { CreatePageDTO } from './CreatePageDTO'
import { FakePagesRepository } from './FakePagesRepository'
import { PagesService } from './PagesService'

describe.skip(PagesService.name, () => {
    Container.set(PAGES_REPOSITORY, new FakePagesRepository());
    const pagesService = Container.get(PagesService);

    it('Can persist data', async () => {
        const account = new Account(
            new Email('test@test.com'),
            new Password('$testtest')
        )
        const dto = new CreatePageDTO({ name: 'Name', account })
        const uid = await pagesService.create(dto)
        expect((await pagesService.findByUid(uid))).toBeDefined()
    })
})
