import { municipes } from './municipes';
import { charsOdd, charsEven } from './chars';

export const validateITCF = (cfAttr, { name, lastname, birthdate, municipe }) => {
    if (!cfAttr) {
        return false;
    }
    const cf = cfAttr?.toLowerCase();
    const pattern =
        /^([A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1})$|([0-9]{11})$/;
    let toReturn = pattern.test(cf.toUpperCase());
    let failed = {};
    if (name) {
        const check = functionsToCheck.name(cf, name);
        toReturn = toReturn && check;
        failed = { ...failed, name: check };
    }
    if (lastname) {
        const check = functionsToCheck.lastname(cf, lastname);
        toReturn = toReturn && check;
        failed = { ...failed, lastname: check };
    }
    if (birthdate) {
        const check = functionsToCheck.birthdate(cf, birthdate);
        toReturn = toReturn && check;
        failed = { ...failed, birthdate: check };
    }
    if (municipe) {
        const check = functionsToCheck.municipe(cf, municipe);
        toReturn = toReturn && check;
        failed = { ...failed, municipe: check };
    }

    const checkLastChar = functionsToCheck.lastChar(cf);
    toReturn = toReturn && checkLastChar;
    failed = { ...failed, lastChar: checkLastChar };

    // console.log({ valid: toReturn, fails: { ...failed } });

    return toReturn;
};

const functionsToCheck = {
    name: (cf, nameAttr) => {
        const name = nameAttr.toLowerCase();
        if (!name) return false;
        const nameChars = cf.substring(3, 6);
        return helpers.checkForNameAndSurname(name, [0, 2, 3], nameChars);
    },
    lastname: (cf, lastnameAttr) => {
        const lastname = lastnameAttr.toLowerCase();
        if (!lastname) return false;
        const lastnameChars = cf.substring(0, 3);
        return helpers.checkForNameAndSurname(lastname, [0, 1, 2], lastnameChars);
    },
    birthdate: (cf, birthdateAttr) => {
        const splittedYear = birthdateAttr.split('/');
        const day = splittedYear[0];
        const month = splittedYear[1];
        const year = splittedYear[2].length === 4 ? splittedYear[2].substring(2, 4) : splittedYear[2];
        const dayFromCF = cf.substring(9, 11);
        const monthFromCF = cf.substring(8, 9);
        const yearFromCF = cf.substring(6, 8);
        const monthChars = {
            a: '01',
            b: '02',
            c: '03',
            d: '04',
            e: '05',
            h: '06',
            l: '07',
            m: '08',
            p: '09',
            r: '10',
            s: '11',
            t: '12',
        };
        return year === yearFromCF && day === dayFromCF && monthChars[monthFromCF] === month;
    },
    municipe: (cf, municipeAttr) => {
        const municipe = municipeAttr.toLowerCase();
        const municipeFromCF = cf.substring(11, 15).toUpperCase();
        const municipeToCheck = municipes[municipeFromCF].municipe.toLowerCase();
        return municipeToCheck === municipe;
    },
    lastChar: cf => {
        const partialFiscalCode = cf.slice(0, -1)
        const [even, odd] = [...partialFiscalCode].reduce((r, char, i) => (r[(i + 1) % 2].push(char.toUpperCase()), r), [[], []]);
        const oddValues = odd.map(char => charsOdd[`${char}`]);
        const evenValues = even.map(char => charsEven[`${char}`]);
        const sum = oddValues.reduce((a, b) => a + b, 0) + evenValues.reduce((a, b) => a + b, 0);
        const lastCharCheck = String.fromCharCode(97 + (sum % 26)).toUpperCase();
        return lastCharCheck === cf.charAt(cf.length - 1).toUpperCase();
    },
};

const helpers = {
    checkForNameAndSurname: (valueToCheck, indexesToCheck, singleChars) => {
        const length = indexesToCheck.length;
        const patternToMatchConsonants = /[bcdfghlmnpqrstvzjkwxy]/gi;
        const patternToMatchVovels = /[aeiou]/gi;
        const consonants = valueToCheck.match(patternToMatchConsonants) || [];
        const vovels = valueToCheck.match(patternToMatchVovels) || [];
        let returnValueToCheck = '';
        if (consonants.length > length) {
            returnValueToCheck = `${consonants[indexesToCheck[0]]}${consonants[indexesToCheck[1]]}${
                consonants[indexesToCheck[2]]
            }`;
        } else if (consonants.length === length) {
            returnValueToCheck = consonants.join('');
        } else {
            const tmpCheck = consonants.join('');
            returnValueToCheck = `${tmpCheck}${vovels.join()}XXX`.substring(0, length);
        }
        return singleChars === returnValueToCheck;
    },
};
