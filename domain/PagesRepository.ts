import { Page } from "./Page";
import { Uid } from "./Uid";

export interface PagesRepository {
    save(page: Page): Promise<void>;
    findByUid(uid: Uid): Promise<Page | undefined>;
}