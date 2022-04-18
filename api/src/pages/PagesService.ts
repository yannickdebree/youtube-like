import { Service } from 'typedi'
import { Page, Uid } from '../../../domain'
import { CreatePageDTO } from './CreatePageDTO'
import { v4 as uuid } from 'uuid'

@Service()
export class PagesService {
    private pages = new Array<Page>()

    findByUid(uid: Uid) {
        return this.pages.find((page) => page.getUid()?.isEquals(uid))
    }

    create(dto: CreatePageDTO) {
        const { account, name } = dto
        const page = new Page(account, name)

        const uid = new Uid(uuid())

        page.setUid(uid)
        this.pages.push(page)

        return uid
    }
}
