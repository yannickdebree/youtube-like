export class Uid {
    constructor(private readonly value: string) { }

    getValue() {
        return this.value;
    }

    isEquals(uid: Uid) {
        return this.value === uid.getValue();
    }
}