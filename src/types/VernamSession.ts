export interface VernamSession {
    encrypt: (input: string) => string | Buffer;
    decrypt: (input: string) => string | Buffer;
}