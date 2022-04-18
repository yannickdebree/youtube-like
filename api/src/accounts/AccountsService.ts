import { Service } from "typedi";
import { Account, Email } from "../../../domain";
import { CreateAccountDTO } from "./CreateAccountDTO";

@Service()
export class AccountsService {
    accounts = new Array<Account>();

    findByEmail(email: Email) {
        return this.accounts.find(account => account.getEmail().isEquals(email))
    }

    create(dto: CreateAccountDTO) {
        const { email, password } = dto;
        const account = new Account(email, password);
        this.accounts.push(account);
    }
}