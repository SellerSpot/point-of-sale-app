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

    const categoryNameFormik = useFormik({
        initialValues: {
            categoryName: '',
        },
        validationSchema: formSchema,
        onSubmit(values) {
            alert(JSON.stringify(values.categoryName));
        },
    });
    return (
        <div className={cn(styles.addCategoryWrapper)}>
            <form onSubmit={categoryNameFormik.handleSubmit} className={styles.addCategoryForm} noValidate>
                <div className={cn(styles.categoryInputFieldWrapper)}>
                    <InputField
                        label={'Category Name'}
                        placeHolder={'Name of the category you wish to add'}
                        error={{
                            errorMessage: categoryNameFormik.errors.categoryName ?? '',
                            showError: categoryNameFormik.errors.categoryName !== undefined,
                        }}
                        value={categoryNameFormik.values.categoryName}
                        onChange={(value) => categoryNameFormik.setFieldValue('categoryName', value)}
                    />
                </div>
                <div className={cn(styles.submitCategoryNameWrapper)}>
                    <Button
                        label={'Add Category'}
                        variant={'outline'}
                        labelColor={'--inventory-color'}
                        backgroundColor={'--inventory-color'}
                        type="button"
                        onClick={() => void 0}
                    />
                </div>
            </form>
        </div>
    );
};
