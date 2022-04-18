import { Email } from "../../../domain";
import { AccountsService } from "./AccountsService";
import { CreateAccountDTO } from "./CreateAccountDTO";

describe(AccountsService.name, () => {
    const accountsService = new AccountsService();

    it('Can save account', () => {
        const email = new Email("test@test.com")
        const dto = new CreateAccountDTO({ email: email.getValue(), password: "$testtest" });
        accountsService.create(dto);
        expect(accountsService.findByEmail(email)).toBeDefined();
    })
})