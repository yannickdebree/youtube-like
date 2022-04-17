import { Uid } from "./Uid";

export interface UidFactory {
    create(): Uid;
}