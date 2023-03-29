import { randomBytes } from 'crypto';

const secretOrKey = randomBytes(32).toString('hex');

console.log(secretOrKey);
