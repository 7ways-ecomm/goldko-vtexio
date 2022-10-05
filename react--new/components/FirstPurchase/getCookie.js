export default function getCookie(param) {
    let allCookies = document.cookie.split(";");

    let result = allCookies.filter(function (cookie) {
        return cookie.indexOf(param) != -1
    });

    result = result.toString().trim();


    return result && result.length > 0 ? result : false;
}