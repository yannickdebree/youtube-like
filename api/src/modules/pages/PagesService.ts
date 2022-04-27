import { Page, PagesRepository, Uid } from '../../domain'
import { generateUid } from '../../utils/uid'
import { CreatePageDTO } from './CreatePageDTO'

export class PagesService {
    constructor(private readonly pagesRepository: PagesRepository) {}

    private pages = new Array<Page>()

    findByUid(uid: Uid) {
        return this.pagesRepository.findByUid(uid)
    }

    async create(dto: CreatePageDTO) {
        const { account, name } = dto
        const page = new Page(account, name)

        const uid = new Uid(generateUid())

        page.setUid(uid)
        await this.pagesRepository.save(page)

        return uid
    }
}
