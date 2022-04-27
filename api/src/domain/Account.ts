import { Email } from './Email'
import { Password } from './Password'
import { Uid } from './Uid'

export class Account {
    private uid?: Uid

    constructor(private email: Email, private password: Password) {}

    getEmail() {
        return this.email
    }

    getPassword() {
        return this.password
    }

    getUid() {
        return this.uid
    }

    setUid(uid: Uid) {
        this.uid = uid
    }
}
