import { postRequest, deleteRequest } from "../helpers/http";

export function addNewAppt(inpBody: any) {
    return postRequest('/api/appt/add', inpBody);
}

export function updateApptIsActive(inpBody: any) {
    return postRequest('/api/appt/update/isActive', inpBody);
}

export function updateApptMentor(inpBody: any) {
    return postRequest('/api/appt/update/mentor', inpBody);
}

export function deleteAppt(inpBody: any) {
    return deleteRequest('/api/appt/delete', inpBody);
}