import { Knex } from 'knex'
import Container from 'typedi'
import { Uid, Video, VideosRepository } from '../../../domain'
import { PagesService } from '../../pages'

interface VideoDatabaseRow {
    uid: string
    path: string
    pageUid: string
    name?: string
    description?: string
}

export function videoToRow(video: Video) {
    return {
        uid: video.getUid().getValue(),
        path: video.getPath(),
        pageUid: video.getPage().getUid().getValue(),
        name: video.getName(),
        description: video.getDescription(),
    } as VideoDatabaseRow
}

export async function rowToVideo({
    uid,
    path,
    pageUid,
    name,
    description,
}: VideoDatabaseRow) {
    const pagesService = Container.get(PagesService)
    const account = await pagesService.findByUid(new Uid(pageUid))
    const video = new Video(account, path)
    video.setUid(new Uid(uid))
    if (!!name) {
        video.setName(name)
    }
    if (!!description) {
        video.setDescription(description)
    }
    return video
}

export class KnexVideosRepository implements VideosRepository {
    constructor(private readonly knex: Knex) {}

    save(video: Video) {
        return this.knex
            .transaction((transaction) =>
                transaction.insert(videoToRow(video)).into('videos')
            )
            .then(() => {})
    }

    async findByUid(uid: Uid) {
        const row = await this.knex
            .select()
            .table('videos')
            .where({ uid: uid.getValue() })
            .first()
        if (!!row) {
            return rowToVideo(row)
        }
    }
}
