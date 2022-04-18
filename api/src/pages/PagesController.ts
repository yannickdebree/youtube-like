import { Service } from "typedi";
import { EmptyNameError } from "../../../domain";
import { ControllerParams, Response } from '../routing';
import { EMPTY_NAME } from "../utils/http-messages";
import { PagesService } from "./AccountsService";
import { CreatePageDTO } from "./CreatePageDTO";

@Service()
export class PagesController {
    constructor(
        private readonly pagesService: PagesService
    ) { }

    create({ connectedAccount, context }: ControllerParams) {
        if (!connectedAccount) {
            return new Response({ status: 401 });
        }

        try {
            const dto = new CreatePageDTO({ ...context.request.body, account: connectedAccount });

            const uid = this.pagesService.create(dto);

            return new Response({ status: 201, body: { data: { uid } } })
        } catch (err) {
            if (err instanceof EmptyNameError) {
                return new Response({ status: 422, body: { message: EMPTY_NAME } })
            }
        }
    }
}