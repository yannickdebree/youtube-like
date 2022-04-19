import { Account } from "./Account";
import { Email } from "./Email";
import { Uid } from "./Uid";

export interface AccountsRepository {
    save(account: Account): Promise<void>;
    findByUid(uid: Uid): Promise<Account | undefined>;
    findByEmail(email: Email): Promise<Account | undefined>;
}