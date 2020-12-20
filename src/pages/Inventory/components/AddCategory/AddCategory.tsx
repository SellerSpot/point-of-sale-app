import React, { ReactElement } from 'react';
import { Button } from '../../../../components/Button/Button';
import { InputField } from '../../../../components/InputField/InputField';
import styles from './addcategory.module.css';
import cn from 'classnames';
import * as Yup from 'yup';
import { useFormik } from 'formik';

export const AddCategory = (): ReactElement => {
    const formSchema = Yup.object().shape({
        name: Yup.string().required('Category Name is a required field'),
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
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className={cn(styles.pageWrapper)} noValidate>
            <div className={styles.pageHeader}>Add Category</div>
            <div className={styles.pageBody}>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Category Name'}
                        placeHolder={'Category Name'}
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
                    label="Add Category"
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
