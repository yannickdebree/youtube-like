import { Service } from "typedi";
import { ControllerParams, Response } from '../routing';

@Service()
export class PagesController {
    create({ connectedAccount }: ControllerParams) {
        console.log(connectedAccount);

        if (!!connectedAccount) {
            return new Response({ status: 401 });
        }
    }
}