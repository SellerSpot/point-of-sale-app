import * as Yup from 'yup';

const formSchema = Yup.object().shape({
    name: Yup.string().required('product name is a required field'),
    gtinNumber: Yup.string(),
    category: Yup.string(),
    brand: Yup.string(),
    landingPrice: Yup.number().required('landing price is a required field'),
    profitPercent: Yup.number(),
    sellingPrice: Yup.number().required('selling price is a required field'),
    availableStock: Yup.number(),
    stockUnit: Yup.string(),
    taxBracket: Yup.array(),
});

// Holds the initial values of the form
const formInitialValues = {
    name: '',
    gtinNumber: '',
    category: '',
    brand: '',
    landingPrice: 0,
    profitPercent: 0,
    sellingPrice: 0,
    availableStock: 0,
    stockUnit: '',
    taxBracket: [''],
};

interface ICustomErrorMessagesInitialState {
    name: string;
    gtinNumber: string;
    category: string;
    brand: string;
    landingPrice: string;
    profitPercent: string;
    sellingPrice: string;
    availableStock: string;
    stockUnit: string;
    taxBracket: string[];
}

// Holds the initial values for the customErrorMessage state
const customErrorMessagesInitialState: ICustomErrorMessagesInitialState = {
    name: null,
    gtinNumber: null,
    category: null,
    brand: null,
    landingPrice: null,
    profitPercent: null,
    sellingPrice: null,
    availableStock: null,
    stockUnit: null,
    taxBracket: null,
};
