import { ControllerHandler, ControllerParams, Response } from "../../core/routing";

export function isAccountAuthenticatedGuard<T>(controllerHandler: ControllerHandler<T>) {
    return (params: ControllerParams) => {
        if (!params.connectedAccount) {
            return new Response({ status: 401 });
        }
        return controllerHandler(params);
    }
}
