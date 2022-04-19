import { File } from 'formidable';
import { Service } from "typedi";
import { EmptyVideoSourceError, Uid } from '../../../domain';
import { PagesService } from '../pages';
import { ControllerParams, Response } from "../routing";
import { EMPTY_VIDEO_SOURCE } from "../utils/http-messages";
import { UploadVideoDTO } from './UploadVideoDTO';
import { VideosService } from './VideosService';

@Service()
export class VideosController {
    constructor(
        private readonly pagesService: PagesService,
        private readonly videosService: VideosService,
    ) { }

    async upload({ connectedAccount, context }: ControllerParams) {
        try {
            const { uid } = (context.request as any).params;
            const page = this.pagesService.findByUid(new Uid(uid));

            if (!page || !connectedAccount?.getEmail().isEquals(page.getAccount().getEmail())) {
                return new Response({ status: 401 })
            }

            const file = context.request.files?.source as File;

            if (!file) {
                throw new EmptyVideoSourceError();
            }

            const dto = new UploadVideoDTO({ ...context.request.body, path: file.path, page });

            await this.videosService.create(dto);

            return new Response({ status: 201 });
        } catch (err) {
            if (err instanceof EmptyVideoSourceError) {
                return new Response({ status: 422, body: { message: EMPTY_VIDEO_SOURCE } })
            }
        }
    }
}