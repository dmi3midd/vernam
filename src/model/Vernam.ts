import { type VernamEncoding } from "../types/VernamEncoding";
import { type VernamSession } from "../types/VernamSession";

export default class Vernam {
    static session(key: string, encoding: VernamEncoding) : VernamSession { 
        return {
            encrypt(input: string): string | Buffer {
                return Vernam.encrypt(input, key, encoding);
            },
            decrypt(input: string | Buffer): string | Buffer {
                return Vernam.decrypt(input, key, encoding);
            },
            toUtf8(input: string | Buffer): string {
                return Vernam.toUtf8(input, encoding);
            }
        };
    }

    
    static encrypt(input: string, key: string, encoding: VernamEncoding): string | Buffer {
        const inputBytes: Buffer = Buffer.from(input);
        const keyBytes: Buffer  = Buffer.from(key);
        const buffer: Buffer = Buffer.alloc(inputBytes.length);
        for (let i = 0; i < inputBytes.length; i++) {
            buffer[i] = inputBytes[i] ^ keyBytes[i % keyBytes.length];
        }
        if (encoding === 'hex') {
            return buffer.toString('hex');
        }
        if (encoding === 'base64') {
            return buffer.toString('base64');
        }
        if (encoding === 'buff') {
            return buffer;
        }
        throw new Error("Something go wrong");
    }


    static decrypt(input: string | Buffer, key: string, encoding: VernamEncoding): string | Buffer {
        let inputBytes: Buffer;
        if (encoding === 'hex' && typeof input === 'string') {
            inputBytes = Buffer.from(input, 'hex');
        } 
        else if (encoding === 'base64' && typeof input === 'string') {
            inputBytes = Buffer.from(input, 'base64');
        } 
        else if (encoding === 'buff' && input instanceof Buffer) {
            inputBytes = Buffer.from(input);
        } 
        else {
            throw new Error('Unsupported encoding');
        }
        const keyBytes: Buffer = Buffer.from(key);
        const buffer: Buffer = Buffer.alloc(inputBytes.length);
        for (let i = 0; i < inputBytes.length; i++) {
            buffer[i] = inputBytes[i] ^ keyBytes[i % keyBytes.length];
        }
        if (encoding === 'hex') {
            return buffer.toString('hex');
        }
        if (encoding === 'base64') {
            return buffer.toString('base64');
        }
        if (encoding === 'buff') {
            return buffer;
        }
        throw new Error("Something go wrong");
    }


    static generate(triples: number): string {
        return Array.from({ length: triples }, () => 
            String.fromCharCode(97 + Math.floor(Math.random() * 26)) +
            String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
            String.fromCharCode(48 + Math.floor(Math.random() * 10))
        ).join('-');
    }


    static toUtf8(input: string | Buffer, encoding: VernamEncoding): string {
        if (typeof input === 'string' && encoding === 'hex') {
            return Buffer.from(input, 'hex').toString('utf-8');
        }
        if (typeof input === 'string' && encoding === 'base64') {
            return Buffer.from(input, 'base64').toString('utf-8');
        }
        if (input instanceof Buffer && encoding === 'buff') {
            return input.toString('utf-8')
        }
        throw new Error("Something go wrong");
    }
}