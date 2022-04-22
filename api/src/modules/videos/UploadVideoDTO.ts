import { Page } from "../../domain";

interface UploadVideoDTOParams {
    path: string;
    page: Page;
    name?: string;
    description?: string;
}

export class UploadVideoDTO {
    public readonly path: string;
    public readonly page: Page;
    public readonly name?: string;
    public readonly description?: string;

    constructor(dto: UploadVideoDTOParams) {
        const { path, page, name, description } = dto;
        this.path = path;
        this.page = page;
        this.name = name;
        this.description = description;
    }
}