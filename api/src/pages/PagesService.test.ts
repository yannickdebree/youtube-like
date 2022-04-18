import { Account, Email, Password } from '../../../domain'
import { PagesService } from './PagesService'
import { CreatePageDTO } from './CreatePageDTO'

describe(PagesService.name, () => {
    const pagesService = new PagesService()

    it('Can persist data', () => {
        const account = new Account(
            new Email('test@test.com'),
            new Password('$testtest')
        )
        const dto = new CreatePageDTO({ name: 'Name', account })
        const uid = pagesService.create(dto)
        expect(pagesService.findByUid(uid)).toBeDefined()
    })
})
