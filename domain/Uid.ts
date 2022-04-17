export class Uid {
    constructor(
        private value: string
    ){}

    getValue(){
        return this.value;
    }

    isEquals(uid: Uid){
        return this.getValue() === uid.getValue();
    }
}