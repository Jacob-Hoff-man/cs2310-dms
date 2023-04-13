import { postRequest, deleteRequest } from "../helpers/http";

export function addNewKid(inpBody: any) {
    return postRequest('/api/kid/add', inpBody);
}

export function deleteKid(inpBody: any) {
    return deleteRequest('/api/kid/delete', inpBody);
}

export function deleteKidByAppId(inpBody: any) {
    return deleteRequest('/api/kid/delete', inpBody)
}