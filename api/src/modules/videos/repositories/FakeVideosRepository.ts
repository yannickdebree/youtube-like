import { Uid, Video, VideosRepository } from '../../../domain'

export class FakeVideosRepository implements VideosRepository {
    private videos = new Array<Video>()

    save(video: Video) {
        this.videos.push(video)
        return Promise.resolve()
    }

    async findByUid(uid: Uid) {
        await Promise.resolve()
        return this.videos.find((video) => video.getUid()?.isEquals(uid))
    }
}
