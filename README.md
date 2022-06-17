# CF Italy validator

This package purpose is to provide a simple solution for a form validation where the user must insert his Italian Fiscal code

# How to install

run `npm i cf-it-validator` inside your project

# How to use

Just import the package where you need and use the validation function:

```js
import {validateITCF} from 'cf-it-validator'

const isValid = validateITCF(fiscal_code, {name, lastname, birthdate /*use this formats: DD/MM/YY or DD/MM/YYYY*/, municipe})
```

for municipes the list is taken [here](https://dait.interno.gov.it/territorio-e-autonomie-locali/sut/elenco_codici_comuni.php)

everything is calculated in lowercase, so no need to worry about case sensitiveness

