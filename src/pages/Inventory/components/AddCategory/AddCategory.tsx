import React, { ReactElement } from 'react';
import { Button } from '../../../../components/Button/Button';
import { InputField } from '../../../../components/InputField/InputField';
import styles from './addcategory.module.css';
import cn from 'classnames';
import * as Yup from 'yup';
import { useFormik } from 'formik';

export const AddCategory = (): ReactElement => {
    const formSchema = Yup.object().shape({
        categoryName: Yup.string().required('Category Name is a required field'),
    });

    // holds the initial values of the form
    const initialValues = {
        categoryName: '',
    };

    const categoryNameFormik = useFormik({
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
        <form onSubmit={categoryNameFormik.handleSubmit} className={cn(styles.addCategoryWrapper)} noValidate>
            <div className={styles.addCategoryHeader}>Add Category</div>
            <div className={styles.addCategoryBody}>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Category Name'}
                        placeHolder={'Category Name'}
                        required={true}
                        value={categoryNameFormik.values.categoryName}
                        error={{
                            errorMessage: categoryNameFormik.errors.categoryName ?? '',
                            showError: categoryNameFormik.errors.categoryName !== undefined,
                        }}
                        onChange={(value) => categoryNameFormik.setFieldValue('categoryName', value)}
                    />
                </div>
            </div>
            <div className={styles.addCategoryFooter}>
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
                    onClick={() => categoryNameFormik.resetForm({ values: initialValues })}
                />
            </div>
        </form>
    );
};
