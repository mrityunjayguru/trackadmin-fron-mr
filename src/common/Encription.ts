import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

const SECRET_KEY = 'TRACKROUTE_PRO-encryption-key'; // Use a secure key and store it safely

// Encrypt function
export const encrypt = (text: string): string => {
    const encrypted = AES.encrypt(text, SECRET_KEY).toString();
    return encrypted;
};

// Decrypt function
export const decrypt = (text: string): Promise<string> => {
    let decrypted: any = AES.decrypt(text,SECRET_KEY ).toString(Utf8);
    console.log(decrypted,"decrypted")
    return decrypted;
}
