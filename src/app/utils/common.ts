import { jwtDecode } from "jwt-decode";

export function isExpiredToken(token: any): boolean {
    var decodedToken = jwtDecode(token);
    if (decodedToken == undefined || decodedToken == null)
        return false;
    // JWT exp is in seconds
    var dateNow = new Date().getTime();
    console.log(new Date(dateNow));
    if ((decodedToken.exp??0)*1000 < dateNow) {
        console.log("Token expired. " + new Date((decodedToken.exp??0)*1000));
        return true;
    } else {
        console.log("Valid token");
        return false;
    }
}