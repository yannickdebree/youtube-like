import { Page } from "../../../domain";
import { EmptyVideoSourceError } from "../utils/errors";

export class UploadVideoDTO {
    public readonly path: string;
    public readonly page: Page;
    public readonly name?: string;
    public readonly description?: string;

    constructor(body: any) {
        const { path, page, name, description } = body;
        if (!path) {
            throw new EmptyVideoSourceError();
        }
        this.path = path;
        this.page = page;
        this.name = name;
        this.description = description;
    }
}