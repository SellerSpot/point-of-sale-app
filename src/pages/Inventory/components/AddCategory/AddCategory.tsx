import React, { ReactElement, useState } from 'react';
import { Button } from 'components/Button/Button';
import { InputField } from 'components/InputField/InputField';
import styles from './addcategory.module.css';
import cn from 'classnames';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { API_ROUTES } from 'config/apiRoutes';
import { apiService } from 'services';
import { showNotify } from 'store/models/notify';

export const AddCategory = (): ReactElement => {
    const [customErrorFlag, setCustomErrorFlag] = useState<boolean>(false);
    const [customErrorMessage, setCustomErrorMessage] = useState<string>('');

    const addCategoryFormSchema = Yup.object().shape({
        categoryName: Yup.string().required('Category Name is a required field'),
    });

    // holds the initial values of the form
    const addCategoryInitialValues = {
        categoryName: '',
    };

    const handleSubmit = async (values: typeof addCategoryInitialValues) => {
        addCategoryFormik.setSubmitting(true);
        setCustomErrorFlag(false);
        setCustomErrorMessage('');
        const response = await apiService.post(API_ROUTES.CATEGORY, {
            categoryName: values.categoryName,
        });
        if (response.status) {
            showNotify({ message: response.data as string, type: 'success' });
            addCategoryFormik.resetForm({ values: addCategoryInitialValues });
        } else {
            setCustomErrorFlag(true);
            setCustomErrorMessage(response.data as string);
        }
        addCategoryFormik.setSubmitting(false);
    };

    const addCategoryFormik = useFormik({
        initialValues: addCategoryInitialValues,
        validationSchema: addCategoryFormSchema,
        onSubmit(values) {
            handleSubmit(values);
        },
    });
    return (
        <form
            onSubmit={addCategoryFormik.handleSubmit}
            className={cn(styles.pageWrapper)}
            noValidate
        >
            <div className={styles.pageHeader}>Add Category</div>
            <div className={styles.pageBody}>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Category Name'}
                        placeHolder={'Category Name'}
                        required={true}
                        value={addCategoryFormik.values.categoryName}
                        error={{
                            errorMessage:
                                addCategoryFormik.errors.categoryName === undefined
                                    ? customErrorFlag
                                        ? customErrorMessage
                                        : ''
                                    : addCategoryFormik.errors.categoryName,
                            showError:
                                customErrorFlag ||
                                addCategoryFormik.errors.categoryName !== undefined,
                        }}
                        onChange={(value) => addCategoryFormik.setFieldValue('categoryName', value)}
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
                    onClick={() =>
                        addCategoryFormik.resetForm({ values: addCategoryInitialValues })
                    }
                />
            </div>
        </form>
    );
};
