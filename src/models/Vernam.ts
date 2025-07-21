type Format = 'hex' | 'base64' | 'buff';

export default class Vernam {
    static encrypt(input: string, key: string, format: Format): string | Buffer {
        // if (input.length !== key.length) {
        //     throw new Error("Input and key must match in length");
        // }

        const inputBytes: Buffer = Buffer.from(input);
        const keyBytes: Buffer  = Buffer.from(key);
        const buffer: Buffer = Buffer.alloc(inputBytes.length);
        for (let i = 0; i < inputBytes.length; i++) {
            buffer[i] = inputBytes[i] ^ keyBytes[i % keyBytes.length];
        }

        if (format === 'hex') {
            return buffer.toString('hex');
        }
        if (format === 'base64') {
            return buffer.toString('base64');
        }
        if (format === 'buff') {
            return buffer;
        }

        throw new Error("Something go wrong");
    }

    static decrypt(input: string | Buffer, key: string, format: Format): string | Buffer {
        let inputBytes: Buffer;
        if (format === 'hex' && typeof input === 'string') {
            inputBytes = Buffer.from(input, 'hex');
        } 
        else if (format === 'base64' && typeof input === 'string') {
            inputBytes = Buffer.from(input, 'base64');
        } 
        else if (format === 'buff' && input instanceof Buffer) {
            inputBytes = Buffer.from(input);
        } 
        else {
            throw new Error('Unsupported format');
        }
        const keyBytes: Buffer = Buffer.from(key);
        const buffer: Buffer = Buffer.alloc(inputBytes.length);
        for (let i = 0; i < inputBytes.length; i++) {
            buffer[i] = inputBytes[i] ^ keyBytes[i % keyBytes.length];
        }

        if (format === 'hex') {
            return buffer.toString('hex');
        }
        if (format === 'base64') {
            return buffer.toString('base64');
        }
        if (format === 'buff') {
            return buffer;
        }
        
        throw new Error("Something go wrong");
    }

    static toUtf8(input: string | Buffer, format: Format): string {
        if (typeof input === 'string' && format === 'hex') {
            return Buffer.from(input, 'hex').toString('utf-8');
        }
        if (typeof input === 'string' && format === 'base64') {
            return Buffer.from(input, 'base64').toString('utf-8');
        }
        if (input instanceof Buffer && format === 'buff') {
            return input.toString('utf-8')
        }

        throw new Error("Something go wrong");
    }
}