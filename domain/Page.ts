import { Account } from "./Account";
import { EmptyNameError } from "./errors";
import { Uid } from "./Uid";

export class Page {
    private uid?: Uid;

    constructor(private readonly account: Account, private name: string) {
        if (!name) {
            throw new EmptyNameError()
        }
    }

    getUid() {
        return this.uid;
    }

    setUid(uid: Uid) {
        this.uid = uid;
    }
}