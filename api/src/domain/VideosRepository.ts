import { Uid } from "./Uid";
import { Video } from "./Video";

export interface VideosRepository {
    save(video: Video): Promise<void>;
    findByUid(uid: Uid): Promise<Video | undefined>;
}