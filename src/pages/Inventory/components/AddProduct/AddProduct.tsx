import React, { ReactElement } from 'react';
import { Button } from '../../../../components/Button/Button';
import { Dropdown } from '../../../../components/Dropdown/Dropdown';
import { HorizontalRule } from '../../../../components/HorizontalRule/HorizontalRule';
import { InputField } from '../../../../components/InputField/InputField';
import styles from './addproduct.module.css';
import cn from 'classnames';
import * as Yup from 'yup';
import { useFormik } from 'formik';

export const AddProduct = (): ReactElement => {
    const formSchema = Yup.object().shape({
        name: Yup.string().required('Product Name is a required field'),
        gtin: Yup.string(),
        category: Yup.string(),
        brand: Yup.string(),
        markup: Yup.number(),
        landingPrice: Yup.number()
            .min(0, 'Landing Price must be greater than or equal to 0')
            .required('Landing Price is a required field'),
        sellingPrice: Yup.number()
            .min(0, 'Selling Price must be greater than or equal to 0')
            .required('Selling Price is a required field'),
        stockLevel: Yup.number().min(0, 'Stock Level must be greater than or equal to 0'),
        stockUnit: Yup.string().required('Stock Unit is a required field'),
    });

    // holds the initial values of the form
    const initialValues = {
        name: '',
        gtin: '',
        category: '',
        brand: '',
        markup: 0,
        landingPrice: 0,
        sellingPrice: 0,
        stockLevel: 0,
        stockUnit: 'KG',
    };

    const formik = useFormik({
        initialValues,
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            alert(JSON.stringify(values, null, 2));
            resetForm({
                values: initialValues,
            });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className={cn(styles.pageWrapper)} noValidate>
            <div className={styles.pageHeader}>Add Product</div>
            <div className={styles.pageBody}>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Product Name'}
                        placeHolder={'Product Name'}
                        required={true}
                        value={formik.values.name}
                        error={{
                            errorMessage: formik.errors.name ?? '',
                            showError: formik.errors.name !== undefined,
                        }}
                        onChange={(value) => formik.setFieldValue('name', value)}
                    />
                </div>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Product GTIN'}
                        placeHolder={'Product Code'}
                        value={formik.values.gtin}
                        error={{
                            errorMessage: formik.errors.gtin ?? '',
                            showError: formik.errors.gtin !== undefined,
                        }}
                        onChange={(value) => formik.setFieldValue('gtin', value)}
                    />
                </div>
                <div className={cn(styles.formGroup, styles.formGroupSplitEqual)}>
                    <Dropdown
                        label={'Product Category'}
                        options={['Category One', 'Category Two', 'Category Three']}
                        onSelect={(value) => {
                            formik.setFieldValue('category', value);
                        }}
                        error={{
                            errorMessage: formik.errors.category ?? '',
                            showError: formik.errors.category !== undefined,
                        }}
                    />
                    <Dropdown
                        label={'Product Brand'}
                        options={['Brand One', 'Brand Two', 'Brand Three']}
                        onSelect={(value) => {
                            formik.setFieldValue('brand', value);
                        }}
                        error={{
                            errorMessage: formik.errors.brand ?? '',
                            showError: formik.errors.brand !== undefined,
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
                        value={formik.values.landingPrice.toString()}
                        onChange={(value) => formik.setFieldValue('landingPrice', value)}
                        error={{
                            errorMessage: formik.errors.landingPrice ?? '',
                            showError: formik.errors.landingPrice !== undefined,
                        }}
                    />
                    <InputField
                        type={'number'}
                        label={'Markup %'}
                        placeHolder={'Markup Percent'}
                        value={formik.values.markup.toString()}
                        onChange={(value) => formik.setFieldValue('markup', value)}
                        error={{
                            errorMessage: formik.errors.markup ?? '',
                            showError: formik.errors.markup !== undefined,
                        }}
                    />
                </div>
                <div className={cn(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        type={'number'}
                        label={'Selling Price'}
                        required={true}
                        placeHolder={'Selling Price'}
                        value={formik.values.sellingPrice.toString()}
                        onChange={(value) => formik.setFieldValue('sellingPrice', value)}
                        error={{
                            errorMessage: formik.errors.sellingPrice ?? '',
                            showError: formik.errors.sellingPrice !== undefined,
                        }}
                    />
                </div>
                <HorizontalRule style={{ paddingTop: 10, paddingBottom: 30 }} />
                <div className={cn(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        type={'number'}
                        label={'Stock Level'}
                        placeHolder={'Stock Level'}
                        value={formik.values.stockLevel.toString()}
                        onChange={(value) => formik.setFieldValue('stockLevel', value)}
                        error={{
                            errorMessage: formik.errors.stockLevel ?? '',
                            showError: formik.errors.stockLevel !== undefined,
                        }}
                    />
                    <Dropdown
                        label={'Stock Unit'}
                        options={['KG', 'Pieces', 'Liters']}
                        onSelect={(value) => {
                            formik.setFieldValue('stockUnit', value);
                        }}
                        error={{
                            errorMessage: formik.errors.stockUnit ?? '',
                            showError: formik.errors.stockUnit !== undefined,
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
                    onClick={() => formik.resetForm({ values: initialValues })}
                />
            </div>
        </form>
    );
};
