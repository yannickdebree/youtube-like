import { EmptyVideoSourceError } from './errors/EmptyVideoSourceError'
import { Page } from './Page'
import { Uid } from './Uid'

export class Video {
    private uid?: Uid
    private name?: string
    private description?: string

    constructor(private page: Page, private path: string) {
        if (!path) {
            throw new EmptyVideoSourceError()
        }
    }

    getUid() {
        return this.uid
    }

    getPath() {
        return this.path
    }

    getPage() {
        return this.page
    }

    getName() {
        return this.name
    }

    getDescription() {
        return this.description
    }

    setUid(uid: Uid) {
        this.uid = uid
    }

    setName(name: string) {
        this.name = name
    }

    setDescription(description: string) {
        this.description = description
    }
}
