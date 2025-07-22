export interface VernamSession {
    encrypt: (input: string) => string | Buffer;
    decrypt: (input: string | Buffer) => string | Buffer;
    toUtf8: (input: string | Buffer) => string;
}