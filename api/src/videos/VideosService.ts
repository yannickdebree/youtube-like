import { Inject, Service } from 'typedi'
import { v4 as uuid } from 'uuid'
import { Uid, Video, VideosRepository } from '../../../domain'
import { VIDEOS_REPOSITORY } from '../utils/services-tokens'
import { UploadVideoDTO } from './UploadVideoDTO'

@Service()
export class VideosService {
    constructor(
        @Inject(VIDEOS_REPOSITORY)
        private readonly videosRepository: VideosRepository
    ) { }

    findByUid(uid: Uid) {
        return this.videosRepository.findByUid(uid);
    }

    async create(dto: UploadVideoDTO) {
        const { path, page, name, description } = dto;
        const video = new Video(page, path);

        if (!!name) {
            video.setName(name);
        }

        if (!!description) {
            video.setDescription(description);
        }

        const uid = new Uid(uuid())

        video.setUid(uid)
        await this.videosRepository.save(video);

        return uid
    }
}
