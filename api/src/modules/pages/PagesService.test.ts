import "reflect-metadata"
import Container from 'typedi'
import { Email, Uid } from '../../domain'
import { declareProvidersForTestServices } from "../../utils/providers"
import { AccountsService } from "../accounts"
import { CreateAccountDTO } from "../accounts/CreateAccountDTO"
import { CreatePageDTO } from './CreatePageDTO'
import { PagesService } from './PagesService'

describe(PagesService.name, () => {
    declareProvidersForTestServices();

    const accountsService = Container.get(AccountsService);
    const pagesService = Container.get(PagesService);

    it('Cannot get unpersisted data', async () => {
        const email = new Email("pages1@service.com");
        await accountsService.create(new CreateAccountDTO({ email: email.getValue(), password: "$testtest" }));
        const account = await accountsService.findByEmail(email);
        const dto = new CreatePageDTO({
            name: 'Name',
            account
        });
        const uid = await pagesService.create(dto);
        const page = await pagesService.findByUid(new Uid(uid.getValue() + "1"));
        expect(page).toBeUndefined();
    })

    it('Can persist data', async () => {
        const email = new Email("pages2@service.com");
        await accountsService.create(new CreateAccountDTO({ email: email.getValue(), password: "$testtest" }));
        const account = await accountsService.findByEmail(email);
        const dto = new CreatePageDTO({
            name: 'Name',
            account
        });
        const uid = await pagesService.create(dto);
        const page = await pagesService.findByUid(new Uid(uid.getValue()));
        expect(page.getUid()).toEqual(uid);
        expect(page.getName()).toBe(dto.name);
        expect(page.getAccount().getEmail().isEquals(email)).toBe(true);
    })
})
