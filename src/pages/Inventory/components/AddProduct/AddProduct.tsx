import { InputField } from '@sellerspot/universal-components';
import { ICONS } from 'config/icons';
import { useFormik } from 'formik';
import { handleSliderClose } from 'layouts/Dashboard/components/Sliders/Sliders';
import lodash from 'lodash';
import React from 'react';
import * as Yup from 'yup';
import { getAddProductStyles } from './addProduct.styles';

const formSchema = Yup.object().shape({
    name: Yup.string().required('Product name is a required field'),
    gtinNumber: Yup.string(),
    category: Yup.string(),
    brand: Yup.string(),
    landingPrice: Yup.number().required('Landing price is a required field'),
    profitPercent: Yup.number(),
    sellingPrice: Yup.number().required('Selling price is a required field'),
    availableStock: Yup.number(),
    stockUnit: Yup.string(),
    taxBracket: Yup.array(),
});

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

export const AddProduct = (): JSX.Element => {
    const styles = getAddProductStyles();

    const formFormik = useFormik({
        initialValues: formInitialValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log('Form Submitted');
        },
    });

    return (
        <form onSubmit={formFormik.handleSubmit} className={styles.pageWrapper} noValidate>
            <div className={styles.pageHeader}>
                <div
                    className={styles.pageHeaderBackIcon}
                    onClick={() => handleSliderClose('addProductSlider')}
                >
                    <ICONS.leftCaretBack size={'35px'} />
                </div>
            </div>
            <div className={styles.pageTitleBar}>Add Product</div>
            <div className={styles.pageBody}>
                <div className={styles.formGroup}>
                    <InputField
                        name={'name'}
                        type={'text'}
                        label={'Product Name'}
                        placeHolder={'Eg. Wanda Paprika'}
                        required={true}
                        error={{
                            errorMessage: formFormik.errors.name ?? '',
                            showError:
                                !lodash.isUndefined(formFormik.errors.name) &&
                                formFormik.touched.name,
                        }}
                        selectTextOnFocus={true}
                        value={formFormik.values.name}
                        onBlur={formFormik.handleBlur}
                        onChange={(event) => formFormik.setFieldValue('name', event.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <InputField
                        name={'gtinNumber'}
                        type={'text'}
                        label={'GTIN Code'}
                        helperText={'Refers to the barcode for the product'}
                        placeHolder={'Eg. 0123456789'}
                        error={{
                            errorMessage: formFormik.errors.gtinNumber ?? '',
                            showError:
                                !lodash.isUndefined(formFormik.errors.gtinNumber) &&
                                formFormik.touched.gtinNumber,
                        }}
                        value={formFormik.values.gtinNumber}
                        onBlur={formFormik.handleBlur}
                        onChange={(event) =>
                            formFormik.setFieldValue('gtinNumber', event.target.value)
                        }
                    />
                </div>
            </div>
        </form>
    );
};
