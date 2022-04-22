import { Inject, Service } from 'typedi'
import { Page, PagesRepository, Uid } from '../../domain'
import { PAGES_REPOSITORY } from '../../utils/services-tokens'
import { generateUid } from '../../utils/uid'
import { CreatePageDTO } from './CreatePageDTO'

@Service()
export class PagesService {
    constructor(
        @Inject(PAGES_REPOSITORY)
        private readonly pagesRepository: PagesRepository
    ) { }

    private pages = new Array<Page>()

    findByUid(uid: Uid) {
        return this.pagesRepository.findByUid(uid)
    }

    async create(dto: CreatePageDTO) {
        const { account, name } = dto
        const page = new Page(account, name)

        const uid = new Uid(generateUid())

        page.setUid(uid)
        await this.pagesRepository.save(page);

        return uid
    }
}
