import { Service } from "typedi";
import { Account, Email } from "../../../domain";
import { EmailEvenUsedError } from "../utils/errors";
import { CreateAccountDTO } from "./CreateAccountDTO";

@Service()
export class AccountsService {
    private accounts = new Array<Account>();

    findByEmail(email: Email) {
        return this.accounts.find(account => account.getEmail().isEquals(email))
    }

    create(dto: CreateAccountDTO) {
        const { email, password } = dto;

        if (!!this.findByEmail(email)) {
            throw new EmailEvenUsedError();
        }

        // TODO: Encrypt password with hashing function
        const account = new Account(email, password);
        this.accounts.push(account);
    }
}