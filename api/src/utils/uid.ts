import { v4 as uuid } from 'uuid'

export function generateUid() {
    return uuid();
}