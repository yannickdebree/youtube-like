import { Service } from 'typedi'
import { v4 as uuid } from 'uuid'
import { Uid, Video } from '../../../domain'
import { UploadVideoDTO } from './UploadVideoDTO'

@Service()
export class VideosService {
    private videos = new Array<Video>()

    findByUid(uid: Uid) {
        return this.videos.find((video) => video.getUid()?.isEquals(uid))
    }

    create(dto: UploadVideoDTO) {
        const { path, page, name, description } = dto;
        const video = new Video(page);
        video.setPath(path);

        if (!!name) {
            video.setName(name);
        }

        if (!!description) {
            video.setDescription(description);
        }

        const uid = new Uid(uuid())

        video.setUid(uid)
        this.videos.push(video);

        return uid
    }
}
