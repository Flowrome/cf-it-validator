const utils = require('..');
const assert = require('assert');
/**
 * All informations
 */
assert.strictEqual(
    utils.validateITCF('MRTMTT80A01F205H', {
        name: 'Matteo',
        lastname: 'Moretti',
        birthdate: '01/01/1980',
        municipe: 'MILANO',
    }),
    true,
    'All informations'
);
/**
 * Only name
 */
assert.strictEqual(
    utils.validateITCF('MRTMTT80A01F205H', {
        name: 'Matteo',
    }),
    true,
    'Only name'
);
/**
 * Only lastname
 */
assert.strictEqual(
    utils.validateITCF('MRTMTT80A01F205H', {
        lastname: 'Moretti',
    }),
    true,
    'Only lastname'
);
/**
 * Only bdate
 */
assert.strictEqual(
    utils.validateITCF('MRTMTT80A01F205H', {
        birthdate: '01/01/1980',
    }),
    true,
    'Only bdate'
);
/**
 * Only municipe
 */
assert.strictEqual(
    utils.validateITCF('MRTMTT80A01F205H', {
        municipe: 'MILANO',
    }),
    true,
    'Only municipe'
);
/**
 * False
 */
assert.strictEqual(
    utils.validateITCF('MRTMTR80A01F205H', {
        name: 'Matteo',
        lastname: 'Moretti',
        birthdate: '01/01/1980',
        municipe: 'MILANO',
    }),
    false,
    'false'
);
console.log(`\u001B[32m✓\u001B[39m Tests passed`);
