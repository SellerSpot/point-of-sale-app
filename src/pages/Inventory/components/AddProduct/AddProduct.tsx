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
        productName: Yup.string().required('Product Name is a required field'),
        productGTIN: Yup.string(),
        productCategory: Yup.string(),
        productBrand: Yup.string(),
        productMarkup: Yup.number(),
        productLandingPrice: Yup.number()
            .min(0, 'Landing Price must be greater than or equal to 0')
            .required('Landing Price is a required field'),
        productSellingPrice: Yup.number()
            .min(0, 'Selling Price must be greater than or equal to 0')
            .required('Selling Price is a required field'),
        productStockLevel: Yup.number().min(0, 'Stock Level must be greater than or equal to 0'),
        productStockUnit: Yup.string().required('Stock Unit is a required field'),
    });

    // holds the initial values of the form
    const addProductInitialValues = {
        productName: '',
        productGTIN: '',
        productCategory: '',
        productBrand: '',
        productMarkup: 0,
        productLandingPrice: 0,
        productSellingPrice: 0,
        productStockLevel: 0,
        productStockUnit: 'KG',
    };

    const addProductFormik = useFormik({
        initialValues: addProductInitialValues,
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            alert(JSON.stringify(values, null, 2));
            resetForm({
                values: addProductInitialValues,
            });
        },
    });

    return (
        <form
            onSubmit={addProductFormik.handleSubmit}
            className={cn(styles.pageWrapper)}
            noValidate
        >
            <div className={styles.pageHeader}>Add Product</div>
            <div className={styles.pageBody}>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Product Name'}
                        placeHolder={'Product Name'}
                        required={true}
                        value={addProductFormik.values.productName}
                        error={{
                            errorMessage: addProductFormik.errors.productName ?? '',
                            showError: addProductFormik.errors.productName !== undefined,
                        }}
                        onChange={(value) => addProductFormik.setFieldValue('productName', value)}
                    />
                </div>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Product GTIN'}
                        placeHolder={'Product Code'}
                        value={addProductFormik.values.productGTIN}
                        error={{
                            errorMessage: addProductFormik.errors.productGTIN ?? '',
                            showError: addProductFormik.errors.productGTIN !== undefined,
                        }}
                        onChange={(value) => addProductFormik.setFieldValue('productGTIN', value)}
                    />
                </div>
                <div className={cn(styles.formGroup, styles.formGroupSplitEqual)}>
                    <Dropdown
                        label={'Product Category'}
                        options={['Category One', 'Category Two', 'Category Three']}
                        onSelect={(value) => {
                            addProductFormik.setFieldValue('productCategory', value);
                        }}
                        error={{
                            errorMessage: addProductFormik.errors.productCategory ?? '',
                            showError: addProductFormik.errors.productCategory !== undefined,
                        }}
                    />
                    <Dropdown
                        label={'Product Brand'}
                        options={['Brand One', 'Brand Two', 'Brand Three']}
                        onSelect={(value) => {
                            addProductFormik.setFieldValue('productBrand', value);
                        }}
                        error={{
                            errorMessage: addProductFormik.errors.productBrand ?? '',
                            showError: addProductFormik.errors.productBrand !== undefined,
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
                        value={addProductFormik.values.productLandingPrice.toString()}
                        onChange={(value) =>
                            addProductFormik.setFieldValue('productLandingPrice', value)
                        }
                        error={{
                            errorMessage: addProductFormik.errors.productLandingPrice ?? '',
                            showError: addProductFormik.errors.productLandingPrice !== undefined,
                        }}
                    />
                    <InputField
                        type={'number'}
                        label={'Markup %'}
                        placeHolder={'Markup Percent'}
                        value={addProductFormik.values.productMarkup.toString()}
                        onChange={(value) => addProductFormik.setFieldValue('productMarkup', value)}
                        error={{
                            errorMessage: addProductFormik.errors.productMarkup ?? '',
                            showError: addProductFormik.errors.productMarkup !== undefined,
                        }}
                    />
                </div>
                <div className={cn(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        type={'number'}
                        label={'Selling Price'}
                        required={true}
                        placeHolder={'Selling Price'}
                        value={addProductFormik.values.productSellingPrice.toString()}
                        onChange={(value) =>
                            addProductFormik.setFieldValue('productSellingPrice', value)
                        }
                        error={{
                            errorMessage: addProductFormik.errors.productSellingPrice ?? '',
                            showError: addProductFormik.errors.productSellingPrice !== undefined,
                        }}
                    />
                </div>
                <HorizontalRule style={{ paddingTop: 10, paddingBottom: 30 }} />
                <div className={cn(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        type={'number'}
                        label={'Stock Level'}
                        placeHolder={'Stock Level'}
                        value={addProductFormik.values.productStockLevel.toString()}
                        onChange={(value) =>
                            addProductFormik.setFieldValue('productStockLevel', value)
                        }
                        error={{
                            errorMessage: addProductFormik.errors.productStockLevel ?? '',
                            showError: addProductFormik.errors.productStockLevel !== undefined,
                        }}
                    />
                    <Dropdown
                        label={'Stock Unit'}
                        options={['KG', 'Pieces', 'Liters']}
                        onSelect={(value) => {
                            addProductFormik.setFieldValue('productStockUnit', value);
                        }}
                        error={{
                            errorMessage: addProductFormik.errors.productStockUnit ?? '',
                            showError: addProductFormik.errors.productStockUnit !== undefined,
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
                    onClick={() => addProductFormik.resetForm({ values: addProductInitialValues })}
                />
            </div>
        </form>
    );
};
