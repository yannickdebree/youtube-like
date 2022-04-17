import { Account } from "./Account";
import { Uid } from "./Uid";
import { Video } from "./Video";

export class Page {
    private videos = new Array<Video>();

    constructor(private readonly account: Account) { }

    getVideoByUid(uid: Uid) {
        return this.videos.find(video => video.getUid().isEquals(uid));
    }

    addVideo(video: Video) {
        this.videos.push(video);
        return this;
    }

    updateVideo(video: Video) {
        this.videos.forEach((v, index) => {
            if (v.getUid().isEquals(video.getUid())) {
                this.videos[index] = video;
            }
        })
    }

    removeVideo(video: Video){
        this.videos = this.videos.filter((v) =>  v.getUid() !== video.getUid());
    }
}