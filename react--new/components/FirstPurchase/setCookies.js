export default function setCookie(propertie, value, exdays) {
    let expires;
    let date;

    date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
    expires = date.toUTCString();

    document.cookie = `${propertie} = ${value}; expires = ${expires}; path = /`;
}