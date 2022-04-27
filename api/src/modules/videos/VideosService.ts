import { Uid, Video, VideosRepository } from '../../domain'
import { generateUid } from '../../utils/uid'
import { UploadVideoDTO } from './UploadVideoDTO'

export class VideosService {
    constructor(private readonly videosRepository: VideosRepository) {}

    findByUid(uid: Uid) {
        return this.videosRepository.findByUid(uid)
    }

    async create(dto: UploadVideoDTO) {
        const { path, page, name, description } = dto
        const video = new Video(page, path)

        if (!!name) {
            video.setName(name)
        }

        if (!!description) {
            video.setDescription(description)
        }

        const uid = new Uid(generateUid())
        video.setUid(uid)

        await this.videosRepository.save(video)

        return uid
    }
}
