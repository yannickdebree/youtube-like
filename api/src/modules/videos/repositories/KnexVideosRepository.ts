import { Knex } from "knex";
import Container, { Inject, Service } from "typedi";
import { Uid, Video, VideosRepository } from "../../../domain";
import { KNEX_CONNECTION } from "../../../utils/services-tokens";
import { KnexPagesRepository } from "../../pages";

interface VideoDatabaseRow { uid: string; path: string; pageUid: string; name?: string; description?: string }

export function videoToRow(video: Video) {
    return {
        uid: video.getUid().getValue(),
        path: video.getPath(),
        pageUid: video.getPage().getUid().getValue(),
        name: video.getName(),
        description: video.getDescription()
    } as VideoDatabaseRow
};

export async function rowToVideo({ uid, path, pageUid, name, description }: VideoDatabaseRow) {
    const accountsRepository = Container.get(KnexPagesRepository);
    const account = await accountsRepository.findByUid(new Uid(pageUid));
    const video = new Video(account, path);
    video.setUid(new Uid(uid));
    if (!!name) {
        video.setName(name);
    }
    if (!!description) {
        video.setDescription(description)
    }
    return video;
}

@Service()
export class KnexVideosRepository implements VideosRepository {
    constructor(
        @Inject(KNEX_CONNECTION)
        private readonly knex: Knex
    ) { }

    save(video: Video) {
        return this.knex.transaction(
            transaction => transaction
                .insert(videoToRow(video))
                .into("videos")
        ).then(() => { });
    }

    async findByUid(uid: Uid) {
        const row = await this.knex.select().table('videos').where({ uid: uid.getValue() }).first();
        if (!!row) {
            return rowToVideo(row);
        }
    }
}