import * as saleAPIs from './sale';
import * as productAPIs from './product';
import * as categoryAPIs from './category';
import * as brandAPIs from './brand';
import * as stockUnitAPIs from './stockUnit';
import * as taxBracketAPIs from './taxBracket';

export default {
    sale: saleAPIs,
    product: productAPIs,
    category: categoryAPIs,
    brand: brandAPIs,
    stockUnit: stockUnitAPIs,
    taxBracket: taxBracketAPIs,
};
