import { Service } from 'typedi'
import { EmptyNameError } from '../../domain'
import { ControllerParams, Response } from '../../core/routing'
import { EMPTY_NAME } from '../../utils/http-messages'
import { CreatePageDTO } from './CreatePageDTO'
import { PagesService } from './PagesService'

@Service()
export class PagesController {
    constructor(private readonly pagesService: PagesService) { }

    async create({ connectedAccount, context }: ControllerParams) {
        try {
            const dto = new CreatePageDTO({
                ...context.request.body,
                account: connectedAccount,
            });

            const uid = (await this.pagesService.create(dto)).getValue();

            return new Response({ status: 201, body: { data: { uid } } })
        } catch (err) {
            if (err instanceof EmptyNameError) {
                return new Response({
                    status: 422,
                    body: { message: EMPTY_NAME },
                })
            }
            throw err;
        }
    }
}
