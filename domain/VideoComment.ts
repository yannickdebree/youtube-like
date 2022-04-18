import { Account } from './Account'
import { CommentFormatError } from './errors'
import { Video } from './Video'

export class VideoComment {
    constructor(
        private readonly video: Video,
        private readonly account: Account,
        private content: string
    ) {
        if (!content.length) {
            throw new CommentFormatError()
        }
    }
}
