import { Context } from 'koa';
import { Service } from 'typedi';
import { EmailFormatError, PasswordFormatError } from '../../../domain';
import { parseBody } from '../utils';
import { EmailEvenUsedError } from '../utils/errors';
import { EMAIl_EVEN_USED, EMAIL_FORMAT_ERROR, PASSWORD_FORMAT_ERROR } from '../utils/http-messages';
import { AccountsService } from './AccountsService';
import { CreateAccountDTO } from './CreateAccountDTO';

@Service()
export class AccountsController {
    constructor(
        public accountsService: AccountsService
    ) { }

    create(ctx: Context) {
        try {
            const dto = new CreateAccountDTO(ctx.request.body);
            this.accountsService.create(dto);
            ctx.response.status = 201;
        } catch (err) {
            if (err instanceof EmailFormatError) {
                ctx.response.status = 422;
                ctx.body = parseBody({
                    message: EMAIL_FORMAT_ERROR
                })
            }
            if (err instanceof PasswordFormatError) {
                ctx.response.status = 422;
                ctx.body = parseBody({
                    message: PASSWORD_FORMAT_ERROR
                });
            }
            if (err instanceof EmailEvenUsedError) {
                ctx.response.status = 422;
                ctx.body = parseBody({
                    message: EMAIl_EVEN_USED
                });
            }
        }
    }
}