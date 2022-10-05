import defaults from "./defaults";

export default function setCookie(ip, accept) {
    const url = "/api/dataentities/AC/documents";
    const settings = {
        method: "PATCH",
        headers: {
            Accept: 'application/vnd.vtex.ds.v10+json',
            'Content-Type': 'application/json',
            "x-vtex-api-appKey": defaults.appKey,
            "x-vtex-api-appToken": defaults.appToken
        },
        body: JSON.stringify({
            "id": ip,
            "accept": accept,
        })
    }
    return fetch(url, settings);
}