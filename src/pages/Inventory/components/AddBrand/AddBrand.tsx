import React, { ReactElement } from 'react';
import { Button } from '../../../../components/Button/Button';
import { InputField } from '../../../../components/InputField/InputField';
import styles from './addbrand.module.css';
import cn from 'classnames';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { apiService } from '../../../../services';
import { API_ROUTES } from '../../../../config/apiRoutes';

export const AddBrand = (): ReactElement => {
    const addBrandFormSchema = Yup.object().shape({
        brandName: Yup.string().required('Brand Name is a required field'),
    });

    // holds the initial values of the form
    const initialValues = {
        brandName: '',
    };

    const addProductFormik = useFormik({
        initialValues,
        validationSchema: addBrandFormSchema,
        onSubmit(values, { resetForm }) {
            addProductFormik.setSubmitting(true);
            apiService.post(API_ROUTES.ADDBRAND, {
                brandName: values.brandName,
            });
            resetForm({
                values: initialValues,
            });
        },
    });
    return (
        <form onSubmit={addProductFormik.handleSubmit} className={cn(styles.pageWrapper)} noValidate>
            <div className={styles.pageHeader}>Add Category</div>
            <div className={styles.pageBody}>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Brand Name'}
                        placeHolder={'Brand Name'}
                        required={true}
                        value={addProductFormik.values.brandName}
                        error={{
                            errorMessage: addProductFormik.errors.brandName ?? '',
                            showError: addProductFormik.errors.brandName !== undefined,
                        }}
                        onChange={(value) => addProductFormik.setFieldValue('brandName', value)}
                    />
                </div>
            </div>
            <div className={styles.pageFooter}>
                <Button
                    type="submit"
                    disabled={addProductFormik.isSubmitting}
                    shape={'rectangle'}
                    label={'Add Brand'}
                    variant={'solid'}
                    backgroundColor={'--inventory-color'}
                    labelColor={'--light-font-color'}
                />
                <Button
                    type="button"
                    disabled={addProductFormik.isSubmitting}
                    shape="rectangle"
                    label="Reset Values"
                    focusable={false}
                    variant="outline"
                    backgroundColor="--inventory-color"
                    labelColor="--inventory-color"
                    onClick={() => addProductFormik.resetForm({ values: initialValues })}
                />
            </div>
        </form>
    );
};
