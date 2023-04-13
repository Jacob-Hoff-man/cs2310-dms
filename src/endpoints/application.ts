import { postRequest, deleteRequest } from "../helpers/http";

export function addNewApp(inpBody: any) {
    return postRequest('/api/app/add', inpBody);
}

export function updateAppIsApproved(inpBody: any) {
    return postRequest('/api/app/update/isApproved', inpBody);
}

export function deleteApp(inpBody: any) {
    return deleteRequest('/api/app/delete', inpBody);
}