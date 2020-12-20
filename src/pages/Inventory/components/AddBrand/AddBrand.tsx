import React, { ReactElement } from 'react';
import { Button } from '../../../../components/Button/Button';
import { InputField } from '../../../../components/InputField/InputField';
import styles from './addbrand.module.css';
import cn from 'classnames';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import { apiService } from '../../../../services';
// import { API_ROUTES } from '../../../../config/apiRoutes';

export const AddBrand = (): ReactElement => {
    const formSchema = Yup.object().shape({
        name: Yup.string().required('Brand Name is a required field'),
    });

    // holds the initial values of the form
    const initialValues = {
        name: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema: formSchema,
        onSubmit(values, { resetForm }) {
            alert(JSON.stringify(values));
            resetForm({
                values: initialValues,
            });
            // apiService.post(API_ROUTES.ADDBRAND, {
            //     brandName: values.brandName,
            // });
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className={cn(styles.pageWrapper)} noValidate>
            <div className={styles.pageHeader}>Add Category</div>
            <div className={styles.pageBody}>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Brand Name'}
                        placeHolder={'Brand Name'}
                        required={true}
                        value={formik.values.name}
                        error={{
                            errorMessage: formik.errors.name ?? '',
                            showError: formik.errors.name !== undefined,
                        }}
                        onChange={(value) => formik.setFieldValue('name', value)}
                    />
                </div>
            </div>
            <div className={styles.pageFooter}>
                <Button
                    type="submit"
                    shape="rectangle"
                    label="Add Brand"
                    variant="solid"
                    backgroundColor="--inventory-color"
                    labelColor="--light-font-color"
                />
                <Button
                    type="button"
                    shape="rectangle"
                    label="Reset Values"
                    focusable={false}
                    variant="outline"
                    backgroundColor="--inventory-color"
                    labelColor="--inventory-color"
                    onClick={() => formik.resetForm({ values: initialValues })}
                />
            </div>
        </form>
    );
};
