import Vernam from "./models/Vernam";
async function f1() {
    const obj = {
        a: 1488,
        b: [1,2,3],
        c: 'str'
    }
    const encrypted = Vernam.encrypt(JSON.stringify(obj), 'world asdfg', 'buff');
    console.log('Encrypted => ', encrypted);
    const decrypted = Vernam.decrypt(encrypted, 'world asdfg', 'buff');
    console.log('Decrypted => ', decrypted);
    console.log(JSON.parse(Vernam.toUtf8(decrypted, 'buff')));
}
f1()