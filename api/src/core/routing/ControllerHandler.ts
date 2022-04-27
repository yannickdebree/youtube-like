import { ControllerParams } from './ControllerParams'
import { Response } from './Response'

export type ControllerHandler<T> = (
    params: ControllerParams
) => Promise<Response<T> | undefined> | Response<T> | undefined
