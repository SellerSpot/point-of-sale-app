/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Button } from '@sellerspot/universal-components';
import { Dropdown } from '@sellerspot/universal-components';
import { HorizontalRule } from '@sellerspot/universal-components';
import { InputField } from '@sellerspot/universal-components';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import lodash from 'lodash';
import { apiService } from 'services';
import { API_ROUTES } from 'config/apiRoutes';
import { showNotify } from 'store/models/notify';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { handleSliderClose } from 'layouts/Dashboard/components/Sliders/Sliders';
import { cssColors } from 'config/cssVariables';
import { getAddProductStyles } from './addProduct.styles';
import { cx } from '@emotion/css';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const formSchema = Yup.object().shape({
    name: Yup.string().required('product name is a required field'),
    gtinNumber: Yup.string(),
    category: Yup.string().length(24),
    brand: Yup.string().length(24),
    landingPrice: Yup.number().required('landing price is a required field'),
    profitPercent: Yup.number(),
    sellingPrice: Yup.number().required('selling price is a required field'),
    availableStock: Yup.number(),
    stockUnit: Yup.string().length(24),
    taxBracket: Yup.array().length(24),
});

// holds the initial values of the form
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

// holds the initial values for the customErrorMessage state
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

interface IDropdownValues {
    values: {
        id: string;
        name: string;
        taxPercent?: number;
    }[];
}

export const AddProduct = (): ReactElement => {
    // holds the server side validation error messages
    const [customErrorMessages, setCustomErrorMessages] = useState(customErrorMessagesInitialState);
    const sliderState = useSelector((state: RootState) => state.sliderModal);

    // holds the different dropdown values used in components
    const [brandDropdownValues, setBrandDropdownValues] = useState<IDropdownValues>({
        values: [],
    });
    const [categoryDropdownValues, setCategoryDropdownValues] = useState<IDropdownValues>({
        values: [],
    });
    const [stockUnitDropdownValues, setStockUnitDropdownValues] = useState<IDropdownValues>({
        values: [],
    });
    const [taxBracketDropdownValues, setTaxBracketDropdownValues] = useState<IDropdownValues>({
        values: [],
    });

    const formFormik = useFormik({
        initialValues: formInitialValues,
        validationSchema: formSchema,
        validateOnChange: false,
        onSubmit(values) {
            handleSubmit(values);
        },
    });

    useEffect(() => {
        if (!lodash.isUndefined(sliderState.addProductSlider.autoFillData))
            formFormik.setValues({
                name: sliderState.addProductSlider.autoFillData?.name,
                brand: sliderState.addProductSlider.autoFillData?.brand,
                category: sliderState.addProductSlider.autoFillData?.category,
                availableStock:
                    sliderState.addProductSlider.autoFillData?.stockInformation.availableStock,
                gtinNumber: sliderState.addProductSlider.autoFillData?.gtinNumber,
                landingPrice: sliderState.addProductSlider.autoFillData?.landingPrice,
                profitPercent: sliderState.addProductSlider.autoFillData?.profitPercent,
                sellingPrice: sliderState.addProductSlider.autoFillData?.sellingPrice,
                stockUnit: sliderState.addProductSlider.autoFillData?.stockInformation.stockUnit,
                taxBracket: sliderState.addProductSlider.autoFillData?.taxBracket,
            });
        else formFormik.resetForm();
    }, [sliderState.addProductSlider.autoFillData]);

    const handleSubmit = async (values: typeof formInitialValues) => {
        formFormik.setSubmitting(true);
        setCustomErrorMessages(customErrorMessagesInitialState);
        console.log({
            name: values.name,
            gtinNumber: values.gtinNumber,
            category: values.category,
            brand: values.brand,
            landingPrice: values.landingPrice,
            profitPercent: values.profitPercent,
            sellingPrice: values.sellingPrice,
            stockInformation: {
                availableStock: values.availableStock,
                stockUnit: values.stockUnit,
            },
            taxBracket: [values.taxBracket],
        });

        console.log('Validatefd');

        // sending API request
        const response = await apiService.post(API_ROUTES.PRODUCT, {
            name: values.name,
            gtinNumber: values.gtinNumber,
            category: values.category,
            brand: values.brand,
            landingPrice: values.landingPrice,
            profitPercent: values.profitPercent,
            sellingPrice: values.sellingPrice,
            stockInformation: {
                availableStock: values.availableStock,
                stockUnit: values.stockUnit,
            },
            taxBracket: [values.taxBracket],
        });

        console.log(response);

        // parsing response
        if (response.status) {
            showNotify({ message: response.data as string, type: 'success' });
            formFormik.resetForm({ values: formInitialValues });
        } else {
            // setting custom error messages
            response.error.map((error: { fieldName: string; message: string }) => {
                switch (error.fieldName) {
                    case 'name':
                        setCustomErrorMessages({
                            ...customErrorMessages,
                            name: error.message,
                        });
                        break;
                    case 'gtinNumber':
                        setCustomErrorMessages({
                            ...customErrorMessages,
                            gtinNumber: error.message,
                        });
                        break;
                    case 'category':
                        setCustomErrorMessages({
                            ...customErrorMessages,
                            category: error.message,
                        });
                        break;
                    case 'brand':
                        setCustomErrorMessages({
                            ...customErrorMessages,
                            brand: error.message,
                        });
                        break;
                    case 'landingPrice':
                        setCustomErrorMessages({
                            ...customErrorMessages,
                            landingPrice: error.message,
                        });
                        break;
                    case 'profitPercent':
                        setCustomErrorMessages({
                            ...customErrorMessages,
                            profitPercent: error.message,
                        });
                        break;
                    case 'sellingPrice':
                        setCustomErrorMessages({
                            ...customErrorMessages,
                            sellingPrice: error.message,
                        });
                        break;
                    case 'availableStock':
                        setCustomErrorMessages({
                            ...customErrorMessages,
                            availableStock: error.message,
                        });
                        break;
                    case 'stockUnit':
                        setCustomErrorMessages({
                            ...customErrorMessages,
                            stockUnit: error.message,
                        });
                        break;
                    case 'taxBracket':
                        setCustomErrorMessages({
                            ...customErrorMessages,
                            taxBracket: [error.message],
                        });
                        break;
                }
            });
        }

        formFormik.setSubmitting(false);
    };

    // used to fetch the brand dropdown values
    const fetchBrands = useCallback(async () => {
        // getting brands
        const response = await apiService.get(API_ROUTES.BRAND);

        // parsing response
        if (response.status) {
            const brandNames: IDropdownValues['values'] = [];
            for (let i = 0; i < response.data.length; i++) {
                brandNames.push({
                    id: response.data[i]._id,
                    name: response.data[i].name,
                });
            }
            setBrandDropdownValues({
                values: brandNames,
            });
            // setting default values for the fields
            formInitialValues.brand = brandNames[0].id;
        } else {
            showNotify({ message: response.error[0].message, type: 'danger' });
        }
    }, []);

    // used to fetch the categories dropdown values
    const fetchCategories = useCallback(async () => {
        // getting brands
        const response = await apiService.get(API_ROUTES.CATEGORY);

        // parsing response
        if (response.status) {
            const categoryNames: IDropdownValues['values'] = [];
            for (let i = 0; i < response.data.length; i++) {
                categoryNames.push({
                    id: response.data[i]._id,
                    name: response.data[i].name,
                });
            }
            setCategoryDropdownValues({
                values: categoryNames,
            });
            // setting default values for the fields
            formInitialValues.category = categoryNames[0].id;
        } else {
            showNotify({ message: response.error[0].message, type: 'danger' });
        }
    }, []);

    // used to fetch the categories dropdown values
    const fetchStockUnits = useCallback(async () => {
        // getting brands
        const response = await apiService.get(API_ROUTES.STOCKUNIT);

        // parsing response
        if (response.status) {
            const stockUnits: IDropdownValues['values'] = [];
            for (let i = 0; i < response.data.length; i++) {
                stockUnits.push({
                    id: response.data[i]._id,
                    name: response.data[i].name,
                });
            }
            setStockUnitDropdownValues({
                values: stockUnits,
            });
            // setting default values for the fields
            formInitialValues.stockUnit = stockUnits[0].id;
        } else {
            showNotify({ message: response.error[0].message, type: 'danger' });
        }
    }, []);

    // used to fetch the categories dropdown values
    const fetchTaxBrackets = useCallback(async () => {
        // getting brands
        const response = await apiService.get(API_ROUTES.TAXBRACKET);

        // parsing response
        if (response.status) {
            const taxBracket: IDropdownValues['values'] = [];
            for (let i = 0; i < response.data.length; i++) {
                taxBracket.push({
                    id: response.data[i]._id,
                    name: response.data[i].name,
                    taxPercent: response.data[i].taxPercent,
                });
            }
            setTaxBracketDropdownValues({
                values: taxBracket,
            });
            // setting default values for the fields
            formInitialValues.taxBracket = [taxBracket[0].id];
        } else {
            showNotify({ message: response.error[0].message, type: 'danger' });
        }
    }, []);

    useEffect(() => {
        fetchBrands();
        fetchCategories();
        fetchStockUnits();
        fetchTaxBrackets();
    }, [fetchBrands, fetchCategories, fetchStockUnits, fetchTaxBrackets]);

    const styles = getAddProductStyles();

    return (
        <form onSubmit={formFormik.handleSubmit} className={styles.pageWrapper} noValidate>
            <div className={styles.pageHeader}>
                <div
                    className={styles.pageHeaderBackIcon}
                    onClick={() => handleSliderClose('addProductSlider')}
                >
                    <MdKeyboardArrowLeft size={'35px'} />
                </div>
            </div>
            <div className={styles.pageTitleBar}>Add Product</div>
            <div className={styles.pageBody}>
                <div className={styles.formGroup}>
                    <InputField
                        type={'text'}
                        label={'Product Name'}
                        placeHolder={'Product Name'}
                        required={true}
                        value={formFormik.values.name}
                        error={{
                            errorMessage: lodash.isUndefined(formFormik.errors.name)
                                ? !lodash.isNull(customErrorMessages.name)
                                    ? customErrorMessages.name
                                    : ''
                                : formFormik.errors.name,
                            showError:
                                !lodash.isNull(customErrorMessages.name) ||
                                !lodash.isUndefined(formFormik.errors.name),
                        }}
                        onChange={(event) => formFormik.setFieldValue('name', event.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <InputField
                        type={'text'}
                        label={'Product GTIN'}
                        placeHolder={'Product Code'}
                        value={formFormik.values.gtinNumber}
                        error={{
                            errorMessage: lodash.isUndefined(formFormik.errors.gtinNumber)
                                ? !lodash.isNull(customErrorMessages.gtinNumber)
                                    ? customErrorMessages.gtinNumber
                                    : ''
                                : formFormik.errors.gtinNumber,
                            showError:
                                !lodash.isNull(customErrorMessages.gtinNumber) ||
                                !lodash.isUndefined(formFormik.errors.gtinNumber),
                        }}
                        onChange={(event) =>
                            formFormik.setFieldValue('gtinNumber', event.target.value)
                        }
                    />
                </div>
                <div className={cx(styles.formGroup, styles.formGroupSplitEqual)}>
                    <Dropdown
                        label={'Product Category'}
                        options={
                            !lodash.isNull(categoryDropdownValues.values)
                                ? categoryDropdownValues.values.map((category) => category.name)
                                : []
                        }
                        onSelect={(index) => {
                            formFormik.setFieldValue(
                                'category',
                                categoryDropdownValues.values.find(
                                    (category) =>
                                        category.name === categoryDropdownValues.values[index].name,
                                ).id,
                            );
                        }}
                        error={{
                            errorMessage: lodash.isUndefined(formFormik.errors.category)
                                ? !lodash.isNull(customErrorMessages.category)
                                    ? customErrorMessages.category
                                    : ''
                                : formFormik.errors.category,
                            showError:
                                !lodash.isNull(customErrorMessages.category) ||
                                !lodash.isUndefined(formFormik.errors.category),
                        }}
                    />
                    <Dropdown
                        label={'Product Brand'}
                        options={
                            !lodash.isNull(brandDropdownValues.values)
                                ? brandDropdownValues.values.map((brand) => brand.name)
                                : []
                        }
                        onSelect={(index) => {
                            formFormik.setFieldValue(
                                'brand',
                                brandDropdownValues.values.find(
                                    (brand) =>
                                        brand.name === brandDropdownValues.values[index].name,
                                ).id,
                            );
                        }}
                        error={{
                            errorMessage: lodash.isUndefined(formFormik.errors.brand)
                                ? !lodash.isNull(customErrorMessages.brand)
                                    ? customErrorMessages.brand
                                    : ''
                                : formFormik.errors.brand,
                            showError:
                                !lodash.isNull(customErrorMessages.brand) ||
                                !lodash.isUndefined(formFormik.errors.brand),
                        }}
                    />
                </div>
                <HorizontalRule
                    style={{
                        horizontalRuleWrapperStyle: {
                            paddingTop: 10,
                            paddingBottom: 20,
                        },
                    }}
                />
                <div className={cx(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        type={'number'}
                        label={'Landing Price'}
                        placeHolder={'Landing Price'}
                        prefix={<p>₹</p>}
                        required={true}
                        value={formFormik.values.landingPrice?.toString()}
                        onChange={(event) =>
                            formFormik.setFieldValue('landingPrice', event.target.value)
                        }
                        error={{
                            errorMessage: lodash.isUndefined(formFormik.errors.landingPrice)
                                ? !lodash.isNull(customErrorMessages.landingPrice)
                                    ? customErrorMessages.landingPrice
                                    : ''
                                : formFormik.errors.landingPrice,
                            showError:
                                !lodash.isNull(customErrorMessages.landingPrice) ||
                                !lodash.isUndefined(formFormik.errors.landingPrice),
                        }}
                    />
                    <InputField
                        type={'number'}
                        label={'Profit Percent'}
                        placeHolder={'Profit Percent'}
                        suffix={<p>%</p>}
                        value={formFormik.values.profitPercent?.toString()}
                        onChange={(event) =>
                            formFormik.setFieldValue('profitPercent', event.target.value)
                        }
                        error={{
                            errorMessage: lodash.isUndefined(formFormik.errors.profitPercent)
                                ? !lodash.isNull(customErrorMessages.profitPercent)
                                    ? customErrorMessages.profitPercent
                                    : ''
                                : formFormik.errors.profitPercent,
                            showError:
                                !lodash.isNull(customErrorMessages.profitPercent) ||
                                !lodash.isUndefined(formFormik.errors.profitPercent),
                        }}
                    />
                </div>
                <div className={styles.formGroup}>
                    <InputField
                        type={'number'}
                        label={'Selling Price'}
                        required={true}
                        placeHolder={'Selling Price'}
                        prefix={<p>₹</p>}
                        value={formFormik.values.sellingPrice?.toString()}
                        onChange={(event) =>
                            formFormik.setFieldValue('sellingPrice', event.target.value)
                        }
                        error={{
                            errorMessage: lodash.isUndefined(formFormik.errors.sellingPrice)
                                ? !lodash.isNull(customErrorMessages.sellingPrice)
                                    ? customErrorMessages.sellingPrice
                                    : ''
                                : formFormik.errors.sellingPrice,
                            showError:
                                !lodash.isNull(customErrorMessages.sellingPrice) ||
                                !lodash.isUndefined(formFormik.errors.sellingPrice),
                        }}
                    />
                </div>
                <HorizontalRule
                    style={{ horizontalRuleWrapperStyle: { paddingTop: 10, paddingBottom: 20 } }}
                />
                <div className={cx(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        type={'number'}
                        label={'Available Stock'}
                        placeHolder={'Available Stock'}
                        value={formFormik.values.availableStock?.toString()}
                        onChange={(event) =>
                            formFormik.setFieldValue('availableStock', event.target.value)
                        }
                        error={{
                            errorMessage: lodash.isUndefined(formFormik.errors.availableStock)
                                ? !lodash.isNull(customErrorMessages.availableStock)
                                    ? customErrorMessages.availableStock
                                    : ''
                                : formFormik.errors.availableStock,
                            showError:
                                !lodash.isNull(customErrorMessages.availableStock) ||
                                !lodash.isUndefined(formFormik.errors.availableStock),
                        }}
                    />
                    <Dropdown
                        label={'Stock Unit'}
                        options={
                            !lodash.isNull(stockUnitDropdownValues.values)
                                ? stockUnitDropdownValues.values.map((stockUnit) => stockUnit.name)
                                : []
                        }
                        onSelect={(value) => {
                            formFormik.setFieldValue(
                                'stockUnit',
                                stockUnitDropdownValues.values.find(
                                    (stockUnit) =>
                                        stockUnit.name ===
                                        stockUnitDropdownValues.values[value].name,
                                ).id,
                            );
                        }}
                        error={{
                            errorMessage: lodash.isUndefined(formFormik.errors.stockUnit)
                                ? !lodash.isNull(customErrorMessages.stockUnit)
                                    ? customErrorMessages.stockUnit
                                    : ''
                                : formFormik.errors.stockUnit,
                            showError:
                                !lodash.isNull(customErrorMessages.stockUnit) ||
                                !lodash.isUndefined(formFormik.errors.stockUnit),
                        }}
                    />
                </div>
                <div className={cx(styles.formGroup)}>
                    <Dropdown
                        label={'Tax Bracket'}
                        options={
                            !lodash.isNull(taxBracketDropdownValues.values)
                                ? taxBracketDropdownValues.values.map(
                                      (taxBracket) =>
                                          taxBracket.name + '-' + taxBracket.taxPercent + '%',
                                  )
                                : []
                        }
                        onSelect={(index) => {
                            formFormik.setFieldValue(
                                'taxBracket',
                                taxBracketDropdownValues.values.find(
                                    (taxBracket) =>
                                        taxBracket.name ===
                                        taxBracketDropdownValues.values[index].name.split('-')[0],
                                ).id,
                            );
                        }}
                        error={{
                            errorMessage: lodash.isUndefined(formFormik.errors.taxBracket)
                                ? !lodash.isNull(customErrorMessages.taxBracket)
                                    ? customErrorMessages.taxBracket?.toString()
                                    : ''
                                : formFormik.errors.taxBracket?.toString(),
                            showError:
                                !lodash.isNull(customErrorMessages.taxBracket) ||
                                !lodash.isUndefined(formFormik.errors.taxBracket),
                        }}
                    />
                </div>
            </div>

            <div className={styles.pageFooter}>
                <Button
                    type="submit"
                    status={formFormik.isSubmitting ? 'disabledLoading' : 'default'}
                    label={'Add Product'}
                    tabIndex={0}
                    style={{
                        backgroundColor: cssColors['--inventory-color'],
                        color: cssColors['--light-font-color'],
                    }}
                />
                <Button
                    type="button"
                    status={formFormik.isSubmitting ? 'disabledLoading' : 'default'}
                    label="Reset Values"
                    style={{
                        backgroundColor: 'transparent',
                        borderColor: cssColors['--inventory-color'],
                        color: cssColors['--inventory-color'],
                    }}
                    onClick={() => {
                        setCustomErrorMessages(customErrorMessagesInitialState);
                        formFormik.resetForm({ values: formInitialValues });
                    }}
                />
            </div>
        </form>
    );
};
