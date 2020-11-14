import { REQUEST_STATUSES } from '../const/REQUEST_STATUSES';
import { valuesResolver } from './valuesResolver';

export function isRequestFailed(status) {
    return valuesResolver(status, REQUEST_STATUSES.FAILED);
}
export function isRequestSucceeded(status) {
    return valuesResolver(status, REQUEST_STATUSES.SUCCEEDED);
}
export function isRequestProcessing(status) {
    return valuesResolver(status, REQUEST_STATUSES.PROCESSING);
}
export function isRequestInitial(status) {
    return valuesResolver(status, REQUEST_STATUSES.INITIAL);
}

export function isRequestFinished(status) {
    return valuesResolver(status, [
        REQUEST_STATUSES.SUCCEEDED,
        REQUEST_STATUSES.FAILED,
    ]);
}
