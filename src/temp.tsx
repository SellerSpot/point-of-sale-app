import React, { ReactElement, useState } from 'react';
import { Button } from 'components/Button/Button';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { HorizontalRule } from 'components/HorizontalRule/HorizontalRule';
import { InputField } from 'components/InputField/InputField';
import styles from './addproduct.module.css';
import cn from 'classnames';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { isNull, isUndefined } from 'lodash';
import { apiService } from 'services';
import { API_ROUTES } from 'config/apiRoutes';
import { showNotify } from 'store/models/notify';

const formSchema = Yup.object().shape({
    name: Yup.string().required('Product Name is a required field'),
    gtinNumber: Yup.string(),
    category: Yup.string(),
    brand: Yup.string(),
    profitPercent: Yup.number(),
    mrpPrice: Yup.number()
        .min(0, 'MRP must be greater than or equal to 0')
        .required('MRP is a required field'),
    landingPrice: Yup.number()
        .min(0, 'Landing Price must be greater than or equal to 0')
        .required('Landing Price is a required field'),
    sellingPrice: Yup.number()
        .min(0, 'Selling Price must be greater than or equal to 0')
        .required('Selling Price is a required field'),
    availableStock: Yup.number().min(0, 'Stock Level must be greater than or equal to 0'),
    stockUnit: Yup.string().required('Stock Unit is a required field'),
    taxBracket: Yup.array(),
});

// holds the initial values of the form
const formInitialValues = {
    name: '',
    gtinNumber: '',
    category: '',
    brand: '',
    profitPercent: '',
    mrpPrice: '',
    landingPrice: '',
    sellingPrice: '',
    availableStock: '',
    stockUnit: '',
    taxBracket: '',
};

interface ICustomErrorMessagesInitialState {
    name: string;
    gtinNumber: string;
    category: string;
    brand: string;
    profitPercent: string;
    mrpPrice: string;
    landingPrice: string;
    sellingPrice: string;
    availableStock: string;
    stockUnit: string;
    taxBracket: string;
}

// holds the initial values for the customErrorMessage state
const customErrorMessagesInitialState: ICustomErrorMessagesInitialState = {
    name: null,
    gtinNumber: null,
    category: null,
    brand: null,
    profitPercent: null,
    mrpPrice: null,
    landingPrice: null,
    sellingPrice: null,
    availableStock: null,
    stockUnit: null,
    taxBracket: null,
};

export const AddProduct = (): ReactElement => {
    // holds the server side validation error messages
    const [customErrorMessages, setCustomErrorMessages] = useState(customErrorMessagesInitialState);

    const formFormik = useFormik({
        initialValues: formInitialValues,
        validationSchema: formSchema,
        onSubmit(values) {
            handleSubmit(values);
        },
    });

    const handleSubmit = async (values: typeof formInitialValues) => {
        formFormik.setSubmitting(true);
        setCustomErrorMessages(customErrorMessagesInitialState);

        console.log('Reached here');

        // sending API request
        const response = await apiService.post(API_ROUTES.PRODUCT, {
            name: values.name,
            category: values.category,
            brand: values.brand,
            gtinNumber: values.gtinNumber,
            mrpPrice: values.mrpPrice,
            landingPrice: values.landingPrice,
            sellingPrice: values.sellingPrice,
            stockInformation: {
                availableStock: values.availableStock,
                stockUnit: values.stockUnit,
            },
            profitPercent: values.profitPercent,
            taxBracket: values.taxBracket,
        });

        console.log('Sent request');
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
                    case 'gtinNumber':
                        setCustomErrorMessages({
                            ...customErrorMessages,
                            gtinNumber: error.message,
                        });
                        break;
                    case 'mrpPrice':
                        setCustomErrorMessages({
                            ...customErrorMessages,
                            mrpPrice: error.message,
                        });
                        break;
                    case 'landingPrice':
                        setCustomErrorMessages({
                            ...customErrorMessages,
                            landingPrice: error.message,
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
                    case 'profitPercent':
                        setCustomErrorMessages({
                            ...customErrorMessages,
                            profitPercent: error.message,
                        });
                        break;
                    case 'taxBracket':
                        setCustomErrorMessages({
                            ...customErrorMessages,
                            taxBracket: error.message,
                        });
                        break;
                }
            });
        }

        formFormik.setSubmitting(false);
    };

    return (
        <form onSubmit={formFormik.handleSubmit} className={cn(styles.pageWrapper)} noValidate>
            <div className={styles.pageHeader}>Add Product</div>
            <div className={styles.pageBody}>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Product Name'}
                        placeHolder={'Product Name'}
                        required={true}
                        value={formFormik.values.name}
                        error={{
                            errorMessage: isUndefined(formFormik.errors.name)
                                ? !isNull(customErrorMessages.name)
                                    ? customErrorMessages.name
                                    : ''
                                : formFormik.errors.name,
                            showError:
                                !isNull(customErrorMessages.name) ||
                                !isUndefined(formFormik.errors.name),
                        }}
                        onChange={(value) => formFormik.setFieldValue('name', value)}
                    />
                </div>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Product GTIN'}
                        placeHolder={'Product Code'}
                        value={formFormik.values.gtinNumber}
                        error={{
                            errorMessage: isUndefined(formFormik.errors.gtinNumber)
                                ? !isNull(customErrorMessages.gtinNumber)
                                    ? customErrorMessages.gtinNumber
                                    : ''
                                : formFormik.errors.gtinNumber,
                            showError:
                                !isNull(customErrorMessages.gtinNumber) ||
                                !isUndefined(formFormik.errors.gtinNumber),
                        }}
                        onChange={(value) => formFormik.setFieldValue('gtinNumber', value)}
                    />
                </div>
                <div className={cn(styles.formGroup, styles.formGroupSplitEqual)}>
                    <Dropdown
                        label={'Product Category'}
                        options={['Category One', 'Category Two', 'Category Three']}
                        onSelect={(value) => {
                            formFormik.setFieldValue('category', value);
                        }}
                        error={{
                            errorMessage: isUndefined(formFormik.errors.category)
                                ? !isNull(customErrorMessages.category)
                                    ? customErrorMessages.category
                                    : ''
                                : formFormik.errors.category,
                            showError:
                                !isNull(customErrorMessages.category) ||
                                !isUndefined(formFormik.errors.category),
                        }}
                    />
                    <Dropdown
                        label={'Product Brand'}
                        options={['Brand One', 'Brand Two', 'Brand Three']}
                        onSelect={(value) => {
                            formFormik.setFieldValue('brand', value);
                        }}
                        error={{
                            errorMessage: isUndefined(formFormik.errors.brand)
                                ? !isNull(customErrorMessages.brand)
                                    ? customErrorMessages.brand
                                    : ''
                                : formFormik.errors.brand,
                            showError:
                                !isNull(customErrorMessages.brand) ||
                                !isUndefined(formFormik.errors.brand),
                        }}
                    />
                </div>
                <HorizontalRule style={{ paddingTop: 10, paddingBottom: 30 }} />
                <div className={cn(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        type={'number'}
                        label={'Landing Price'}
                        placeHolder={'Landing Price'}
                        required={true}
                        value={formFormik.values.landingPrice.toString()}
                        onChange={(value) => formFormik.setFieldValue('landingPrice', value)}
                        error={{
                            errorMessage: isUndefined(formFormik.errors.landingPrice)
                                ? !isNull(customErrorMessages.landingPrice)
                                    ? customErrorMessages.landingPrice
                                    : ''
                                : formFormik.errors.landingPrice,
                            showError:
                                !isNull(customErrorMessages.landingPrice) ||
                                !isUndefined(formFormik.errors.landingPrice),
                        }}
                    />
                    <InputField
                        type={'number'}
                        label={'Profit %'}
                        placeHolder={'Profit Percent'}
                        value={formFormik.values.profitPercent.toString()}
                        onChange={(value) => formFormik.setFieldValue('profitPercent', value)}
                        error={{
                            errorMessage: isUndefined(formFormik.errors.profitPercent)
                                ? !isNull(customErrorMessages.profitPercent)
                                    ? customErrorMessages.profitPercent
                                    : ''
                                : formFormik.errors.profitPercent,
                            showError:
                                !isNull(customErrorMessages.profitPercent) ||
                                !isUndefined(formFormik.errors.profitPercent),
                        }}
                    />
                </div>
                <div className={cn(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        type={'number'}
                        label={'Selling Price'}
                        required={true}
                        placeHolder={'Selling Price'}
                        value={formFormik.values.sellingPrice.toString()}
                        onChange={(value) => formFormik.setFieldValue('sellingPrice', value)}
                        error={{
                            errorMessage: isUndefined(formFormik.errors.sellingPrice)
                                ? !isNull(customErrorMessages.sellingPrice)
                                    ? customErrorMessages.sellingPrice
                                    : ''
                                : formFormik.errors.sellingPrice,
                            showError:
                                !isNull(customErrorMessages.sellingPrice) ||
                                !isUndefined(formFormik.errors.sellingPrice),
                        }}
                    />
                </div>
                <HorizontalRule style={{ paddingTop: 10, paddingBottom: 30 }} />
                <div className={cn(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        type={'number'}
                        label={'Available Stock'}
                        placeHolder={'Available Stock'}
                        value={formFormik.values.availableStock.toString()}
                        onChange={(value) => formFormik.setFieldValue('availableStock', value)}
                        error={{
                            errorMessage: isUndefined(formFormik.errors.availableStock)
                                ? !isNull(customErrorMessages.availableStock)
                                    ? customErrorMessages.availableStock
                                    : ''
                                : formFormik.errors.availableStock,
                            showError:
                                !isNull(customErrorMessages.availableStock) ||
                                !isUndefined(formFormik.errors.availableStock),
                        }}
                    />
                    <Dropdown
                        label={'Stock Unit'}
                        options={['KG', 'Pieces', 'Liters']}
                        onSelect={(value) => {
                            formFormik.setFieldValue('stockUnit', value);
                        }}
                        error={{
                            errorMessage: isUndefined(formFormik.errors.stockUnit)
                                ? !isNull(customErrorMessages.stockUnit)
                                    ? customErrorMessages.stockUnit
                                    : ''
                                : formFormik.errors.stockUnit,
                            showError:
                                !isNull(customErrorMessages.stockUnit) ||
                                !isUndefined(formFormik.errors.stockUnit),
                        }}
                    />
                </div>
                <HorizontalRule style={{ paddingTop: 10, paddingBottom: 30 }} />
                <div className={cn(styles.formGroup)}>
                    <Dropdown
                        label={'Tax Bracket'}
                        options={['GST (5%)', 'CGST (10%)']}
                        onSelect={(value) => {
                            console.log(value);

                            formFormik.setFieldValue('taxBracket', [value]);
                        }}
                        error={{
                            errorMessage: isUndefined(formFormik.errors.taxBracket)
                                ? !isNull(customErrorMessages.taxBracket)
                                    ? customErrorMessages.taxBracket
                                    : ''
                                : formFormik.errors.taxBracket,
                            showError:
                                !isNull(customErrorMessages.taxBracket) ||
                                !isUndefined(formFormik.errors.taxBracket),
                        }}
                    />
                </div>
            </div>
            <div className={styles.pageFooter}>
                <Button
                    type="submit"
                    shape="rectangle"
                    label="Add Product"
                    variant="solid"
                    backgroundColor="--inventory-color"
                    labelColor="--light-font-color"
                />
                <Button
                    type="button"
                    shape="rectangle"
                    label="Reset Values"
                    variant="outline"
                    focusable={false}
                    backgroundColor="--inventory-color"
                    labelColor="--inventory-color"
                    onClick={() => {
                        setCustomErrorMessages(customErrorMessagesInitialState);
                        formFormik.resetForm({ values: formInitialValues });
                    }}
                />
            </div>
        </form>
    );
};
