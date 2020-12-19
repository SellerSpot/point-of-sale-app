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
        stockUnit: Yup.string(),
    });

    const addProductFormik = useFormik({
        initialValues: {
            name: '',
            gtin: '',
            category: '',
            brand: '',
            markup: 0,
            landingPrice: 0,
            sellingPrice: 0,
            stockLevel: 0,
            stockUnit: '',
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <form onSubmit={addProductFormik.handleSubmit} className={cn(styles.addProductWrapper)} noValidate>
            <div className={styles.addProductHeader}>Add Product</div>
            <div className={styles.addProductBody}>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Product Name'}
                        placeHolder={'Product Name'}
                        required={true}
                        value={addProductFormik.values.name}
                        error={{
                            errorMessage: addProductFormik.errors.name ?? '',
                            showError: addProductFormik.errors.name !== undefined,
                        }}
                        onChange={(value) => addProductFormik.setFieldValue('name', value)}
                    />
                </div>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Product GTIN'}
                        placeHolder={'Product Code'}
                        value={addProductFormik.values.gtin}
                        error={{
                            errorMessage: addProductFormik.errors.gtin ?? '',
                            showError: addProductFormik.errors.gtin !== undefined,
                        }}
                        onChange={(value) => addProductFormik.setFieldValue('gtin', value)}
                    />
                </div>
                <div className={cn(styles.formGroup, styles.formGroupSplitEqual)}>
                    <Dropdown
                        label={'Product Category'}
                        options={['Category One', 'Category Two', 'Category Three']}
                        onSelect={(value) => {
                            addProductFormik.setFieldValue('category', value);
                        }}
                    />
                    <Dropdown
                        label={'Product Brand'}
                        options={['Brand One', 'Brand Two', 'Brand Three']}
                        onSelect={(value) => {
                            addProductFormik.setFieldValue('brand', value);
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
                        value={addProductFormik.values.landingPrice.toString()}
                        onChange={(value) => addProductFormik.setFieldValue('landingPrice', value)}
                        error={{
                            errorMessage: addProductFormik.errors.landingPrice ?? '',
                            showError: addProductFormik.errors.landingPrice !== undefined,
                        }}
                    />
                    <InputField
                        type={'number'}
                        label={'Markup %'}
                        placeHolder={'Markup Percent'}
                        value={addProductFormik.values.markup.toString()}
                        onChange={(value) => addProductFormik.setFieldValue('markup', value)}
                        error={{
                            errorMessage: addProductFormik.errors.markup ?? '',
                            showError: addProductFormik.errors.markup !== undefined,
                        }}
                    />
                </div>
                <div className={cn(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        type={'number'}
                        label={'Selling Price'}
                        required={true}
                        placeHolder={'Selling Price'}
                        value={addProductFormik.values.sellingPrice.toString()}
                        onChange={(value) => addProductFormik.setFieldValue('sellingPrice', value)}
                        error={{
                            errorMessage: addProductFormik.errors.sellingPrice ?? '',
                            showError: addProductFormik.errors.sellingPrice !== undefined,
                        }}
                    />
                </div>
                <HorizontalRule style={{ paddingTop: 10, paddingBottom: 30 }} />
                <div className={cn(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        type={'number'}
                        label={'Stock Level'}
                        placeHolder={'Stock Level'}
                        value={addProductFormik.values.stockLevel.toString()}
                        onChange={(value) => addProductFormik.setFieldValue('stockLevel', value)}
                        error={{
                            errorMessage: addProductFormik.errors.stockLevel ?? '',
                            showError: addProductFormik.errors.stockLevel !== undefined,
                        }}
                    />
                    <Dropdown
                        label={'Stock Unit'}
                        options={['KG', 'Pieces', 'Liters']}
                        onSelect={(value) => {
                            addProductFormik.setFieldValue('stockUnit', value);
                        }}
                    />
                </div>
            </div>
            <div className={styles.addProductFooter}>
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
                    backgroundColor="--inventory-color"
                    labelColor="--inventory-color"
                />
            </div>
        </form>
    );
};
