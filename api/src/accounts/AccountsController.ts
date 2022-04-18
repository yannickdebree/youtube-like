import { Service } from 'typedi'
import { EmailFormatError, PasswordFormatError } from '../../../domain'
import { ControllerParams, Response } from '../routing'
import { EmailEvenUsedError } from '../utils/errors'
import {
    EMAIl_EVEN_USED,
    EMAIL_FORMAT_ERROR,
    PASSWORD_FORMAT_ERROR,
} from '../utils/http-messages'
import { AccountsService } from './AccountsService'
import { CreateAccountDTO } from './CreateAccountDTO'

@Service()
export class AccountsController {
    constructor(public accountsService: AccountsService) {}

    create({ context }: ControllerParams) {
        try {
            const dto = new CreateAccountDTO(context.request.body)
            this.accountsService.create(dto)
            return new Response({ status: 201 })
        } catch (err) {
            if (err instanceof EmailFormatError) {
                return new Response({
                    status: 422,
                    body: {
                        message: EMAIL_FORMAT_ERROR,
                    },
                })
            }
            if (err instanceof PasswordFormatError) {
                return new Response({
                    status: 422,
                    body: {
                        message: PASSWORD_FORMAT_ERROR,
                    },
                })
            }
            if (err instanceof EmailEvenUsedError) {
                return new Response({
                    status: 422,
                    body: {
                        message: EMAIl_EVEN_USED,
                    },
                })
            }
        }
    }
}
