import { Service } from "typedi";
import { Page, Uid } from "../../../domain";
import { CreatePageDTO } from "./CreatePageDTO";

@Service()
export class PagesService {
    private pages = new Array<Page>();

    findByUid(uid: Uid) {
        return this.pages.find(page => page.getUid()?.isEquals(uid));
    }

    create(dto: CreatePageDTO) {
        const { account, name } = dto;
        const page = new Page(account, name);

        const uid = new Uid(new Date().toISOString());

        page.setUid(uid);
        this.pages.push(page);

        return uid;
    }
}