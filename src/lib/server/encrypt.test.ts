import { expect, test } from 'vitest'
import { encryptString, decryptString } from './encrypt'

test('Testing cypher encrypt functions: simple string', () => {
    const v = 'Hello, World!';
    const x = encryptString(v);
    const y = decryptString(x);

    expect(v).toBe(y);
});

test('Testing cypher encrypt functions: emoji strings', () => {
    const v = 'Hello, World with emojies: 😎🤓🤠!';
    const x = encryptString(v);
    const y = decryptString(x);

    expect(v).toBe(y);
});