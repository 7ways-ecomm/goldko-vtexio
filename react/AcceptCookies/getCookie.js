import defaults from "./defaults";

export default function getCookie(id) {
    const url = "/api/dataentities/AC/search?_fields=_all&id=" + id;
    const settings = {
        method: "GET",
        headers: {
            "Accept": "application/vnd.vtex.ds.v10+json",
            "Content-Type": "application/json",
            "x-vtex-api-appKey": defaults.appKey,
            "x-vtex-api-appToken": defaults.appToken
        }
    }
    return fetch(url, settings);
}