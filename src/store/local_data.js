export const PREF_PROFILE = "profile"
export function getProfileData() {
    return (JSON.parse(localStorage.getItem(PREF_PROFILE)));
}
export function setProfileData(data) {
    localStorage.setItem(PREF_PROFILE, JSON.stringify(data));
}

export const PREF_USER = "user"
export function getUserData() {
    return (JSON.parse(localStorage.getItem(PREF_USER)));
}
export function setUserData(data) {
    localStorage.setItem(PREF_USER, JSON.stringify(data));
}

export const PREF_PROJECT = "project"
export function getProjectData() {
    return (JSON.parse(localStorage.getItem(PREF_PROJECT)));
}
export function setProjectData(data) {
    localStorage.setItem(PREF_PROJECT, JSON.stringify(data));
}