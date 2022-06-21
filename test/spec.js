const utils = require('..');
const assert = require('assert');
/**
 * All informations
 */
assert.strictEqual(
    utils.validateITCF('NPRRMO96P15H501A', {
        name: 'cirullo',
        lastname: 'balocco',
        birthdate: '01/01/1991',
        municipe: 'MILANO',
    }),
    true,
    'All informations'
);
/**
 * Only name
 */
assert.strictEqual(
    utils.validateITCF('BLCCLL91A01F205B', {
        name: 'cirullo',
    }),
    true,
    'Only name'
);
/**
 * Only lastname
 */
assert.strictEqual(
    utils.validateITCF('BLCCLL91A01F205B', {
        lastname: 'balocco',
    }),
    true,
    'Only lastname'
);
/**
 * Only bdate
 */
assert.strictEqual(
    utils.validateITCF('BLCCLL91A01F205B', {
        birthdate: '01/01/1991',
    }),
    true,
    'Only bdate'
);
/**
 * Only municipe
 */
assert.strictEqual(
    utils.validateITCF('BLCCLL91A01F205B', {
        municipe: 'MILANO',
    }),
    true,
    'Only municipe'
);
/**
 * False
 */
assert.strictEqual(
    utils.validateITCF('BLCCLL91A01F205Z', {
        name: 'cirullo',
        lastname: 'balocco',
        birthdate: '01/01/1991',
        municipe: 'MILANO',
    }),
    false,
    'false'
);
console.log(`\u001B[32m✓\u001B[39m Tests passed`);
