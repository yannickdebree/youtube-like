import { UidFormatError } from './errors'

export class Uid {
    constructor(private readonly value: string) {
        if (value.length === 0) {
            throw new UidFormatError()
        }
    }

    getValue() {
        return this.value
    }

    isEquals(uid: Uid) {
        return this.value === uid.getValue()
    }
}
