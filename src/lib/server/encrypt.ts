import * as crypto from "node:crypto"
import * as dotenv from 'dotenv'
import { customType } from "drizzle-orm/pg-core/columns/custom"
import * as fs from 'node:fs';
import path from "node:path";

// Inspired by: https://github.com/drizzle-team/drizzle-orm/issues/2098

const key = fs.readFileSync( path.resolve( __dirname, '../../../cypher.key' ) ).subarray(0, 32);
const iv = fs.readFileSync( path.resolve( __dirname, '../../../iv.key' ) ).subarray(0, 16);

dotenv.config({
	path: ".env"
})

export function encryptString( data: string ): string {
    const cypher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cypher.update( data, "utf16le", "hex" );
    encrypted += cypher.final( "hex" );
    return encrypted;
}

export function decryptString( data: string ): string {
    const cypher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = cypher.update( data, "hex", "utf16le" );
    decrypted += cypher.final( "utf16le" );
    return decrypted;
}

export const cypherEncryptedText = customType<{ data: string }>({
    dataType() {
        return "text"
    },
    fromDriver(value: unknown): string {
        return decryptString(value as string);
    },
    toDriver(value: string) {
        return encryptString(value);
    },
})