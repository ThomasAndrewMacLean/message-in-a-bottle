import { encrypt, decrypt } from './crypto';

const text = 'lorum ipsum';
const key = 'password';
const wrongKey = 'notPassword';

describe('crypto', () => {
  it('should encrypt', () => {
    const encrypted = encrypt(text, key);
    expect(encrypted).not.toEqual(text);
  });

  it('should decrypt', () => {
    const encrypted = encrypt(text, key);
    expect(decrypt(encrypted, key)).toEqual(text);
  });

  it('should not crash if key is wrong', () => {
    const encrypted = encrypt(text, key);
    expect(decrypt(encrypted, wrongKey)).not.toEqual(text);
  });

  it('should not look at capitalization of the key', () => {
    const encrypted = encrypt(text, key);
    expect(decrypt(encrypted, 'pAsSWord')).toEqual(text);
  });
});
