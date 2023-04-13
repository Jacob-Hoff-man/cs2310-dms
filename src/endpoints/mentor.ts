import { postRequest, deleteRequest } from "../helpers/http";

export function addNewMentor(inpBody: any) {
    return postRequest('/api/mentor/add', inpBody);
}

export function deleteMentor(inpBody: any) {
    return deleteRequest('/api/mentor/delete', inpBody);
}

export function deleteMentorByAppId(inpBody: any) {
    return deleteRequest('/api/mentor/delete', inpBody)
}