import { Account } from "./Account";
import { Email } from "./Email";

export interface AccountsRepository {
    save(account: Account): Promise<void>;
    findByEmail(email: Email): Promise<Account | undefined>;
}