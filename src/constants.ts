import { StatusCode } from "hono/utils/http-status";

interface ErrorInfo {
    message: string;
    status: StatusCode;
}

export const ERRORS: Record<string, ErrorInfo> = {
    ACCESS_TOKEN_IS_REQUIRED: { message: 'Access token is required', status: 400 },
    INVALID_ACCESS_TOKEN: { message: 'Invalid access token', status: 401 },
    BBOX_AREA_TOO_LARGE: { message: 'The bbox area is bigger than allowed size of 0.2 square kilometer.', status: 400 },
}
