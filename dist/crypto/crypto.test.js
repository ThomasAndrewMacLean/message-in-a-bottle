"use strict";

var _crypto = require("./crypto");

const text = 'lorum ipsum';
const key = 'password';
const wrongKey = 'notPassword';
describe('crypto', () => {
  it('should encrypt', () => {
    const encrypted = (0, _crypto.encrypt)(text, key);
    expect(encrypted).not.toEqual(text);
  });
  it('should decrypt', () => {
    const encrypted = (0, _crypto.encrypt)(text, key);
    expect((0, _crypto.decrypt)(encrypted, key)).toEqual(text);
  });
  it('should not crash if key is wrong', () => {
    const encrypted = (0, _crypto.encrypt)(text, key);
    expect((0, _crypto.decrypt)(encrypted, wrongKey)).not.toEqual(text);
  });
});