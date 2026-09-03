import { randomInt } from 'crypto';

// Uppercase letters and digits with the ambiguous characters removed (no I, L,
// O, 0 or 1) so a reference can be read aloud or retyped without confusion.
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

const REF_LENGTH = 6;
const MAX_ATTEMPTS = 5;

const randomRef = (length: number) => {
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += ALPHABET[randomInt(ALPHABET.length)];
  }
  return out;
};

const isTaken = async (strapi: any, ref: string) => {
  const existing = await strapi.db.query('api::email-log.email-log').findOne({
    where: { ref },
    select: ['id'],
  });
  return Boolean(existing);
};

/**
 * Generates a reference that is not already used by another email log entry.
 *
 * Collisions are vanishingly unlikely (31^6 ≈ 887 million combinations) but a
 * clash must never stop an email from being logged, so after a few retries we
 * fall back to a longer reference instead of throwing.
 */
export const generateUniqueRef = async (strapi: any): Promise<string> => {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const ref = randomRef(REF_LENGTH);
    if (!(await isTaken(strapi, ref))) {
      return ref;
    }
  }

  return randomRef(REF_LENGTH + 1);
};

export { ALPHABET, REF_LENGTH };
