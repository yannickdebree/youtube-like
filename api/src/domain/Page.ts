import { Account } from './Account'
import { EmptyNameError } from './errors'
import { Uid } from './Uid'

export class Page {
    private uid?: Uid

    constructor(private readonly account: Account, private name: string) {
        if (name.length === 0) {
            throw new EmptyNameError()
        }
    }

    getUid() {
        return this.uid
    }

    getAccount() {
        return this.account;
    }

    setUid(uid: Uid) {
        this.uid = uid
    }
}
