import { InputField } from '@sellerspot/universal-components';
import { ICONS } from 'config/icons';
import { useFormik } from 'formik';
import { handleSliderClose } from 'layouts/Dashboard/components/Sliders/Sliders';
import lodash from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import * as Yup from 'yup';
import { getAddProductStyles } from './addProduct.styles';

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
    const sliderState = useSelector((state: RootState) => state.sliderModal);

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
                        type={'text'}
                        label={'Product Name'}
                        placeHolder={'Product Name'}
                        required={true}
                        error={{
                            errorMessage: formFormik.errors.name ?? '',
                            showError:
                                !lodash.isUndefined(formFormik.errors.name) &&
                                formFormik.touched.name,
                        }}
                        selectTextOnFocus={true}
                        value={formFormik.values.name}
                        onBlur={(event) => formFormik.handleBlur(event)}
                        onChange={(event) => formFormik.setFieldValue('name', event.target.value)}
                    />
                </div>
            </div>
        </form>
    );
};
