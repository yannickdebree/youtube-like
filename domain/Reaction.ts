import { Account } from "./Account";
import { ReactionType } from "./ReactionType";
import { Video } from "./Video";

export class Reaction {
    constructor(
        private readonly video: Video,
        private readonly account: Account,
        private readonly type: ReactionType
    ) { }
}