import React, { ReactElement, useState } from 'react';
import { Button } from '../../../../components/Button/Button';
import { InputField } from '../../../../components/InputField/InputField';
import styles from './addbrand.module.css';
import cn from 'classnames';
import * as Yup from 'yup';
import { FormikValues, useFormik } from 'formik';
import { apiService } from '../../../../services';
import { API_ROUTES } from '../../../../config/apiRoutes';
import { showNotify } from '../../../../store/models/notify';

export const AddBrand = (): ReactElement => {
    const [customErrorFlag, setCustomErrorFlag] = useState<boolean>(false);
    const [customErrorMessage, setCustomErrorMessage] = useState<string>('');

    const addBrandFormSchema = Yup.object().shape({
        brandName: Yup.string().required('Brand Name is a required field'),
    });

    // holds the initial values of the form
    const addBrandInitialValues = {
        brandName: '',
    };

    const handleSubmit = async (values: FormikValues) => {
        addBrandFormik.setSubmitting(true);
        setCustomErrorFlag(false);
        setCustomErrorMessage('');
        const response = await apiService.post(API_ROUTES.ADDBRAND, {
            brandName: values.brandName,
        });
        if (response.status) {
            showNotify({ message: response.data as string, type: 'success' });
            addBrandFormik.resetForm({ values: addBrandInitialValues });
        } else {
            setCustomErrorFlag(true);
            setCustomErrorMessage(response.data as string);
        }
        addBrandFormik.setSubmitting(false);
    };

    const addBrandFormik = useFormik({
        initialValues: addBrandInitialValues,
        validationSchema: addBrandFormSchema,
        onSubmit(values) {
            handleSubmit(values);
        },
    });
    return (
        <form onSubmit={addBrandFormik.handleSubmit} className={cn(styles.pageWrapper)} noValidate>
            <div className={styles.pageHeader}>Add Category</div>
            <div className={styles.pageBody}>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Brand Name'}
                        disabled={addBrandFormik.isSubmitting}
                        placeHolder={'Brand Name'}
                        required={true}
                        value={addBrandFormik.values.brandName}
                        error={{
                            errorMessage:
                                addBrandFormik.errors.brandName === undefined
                                    ? customErrorFlag
                                        ? customErrorMessage
                                        : ''
                                    : addBrandFormik.errors.brandName,
                            showError: customErrorFlag || addBrandFormik.errors.brandName !== undefined,
                        }}
                        onChange={(value) => addBrandFormik.setFieldValue('brandName', value)}
                    />
                </div>
            </div>
            <div className={styles.pageFooter}>
                <Button
                    type="submit"
                    disabled={addBrandFormik.isSubmitting}
                    shape={'rectangle'}
                    label={'Add Brand'}
                    variant={'solid'}
                    backgroundColor={'--inventory-color'}
                    labelColor={'--light-font-color'}
                />
                <Button
                    type="button"
                    disabled={addBrandFormik.isSubmitting}
                    shape="rectangle"
                    label="Reset Values"
                    focusable={false}
                    variant="outline"
                    backgroundColor="--inventory-color"
                    labelColor="--inventory-color"
                    onClick={() => addBrandFormik.resetForm({ values: addBrandInitialValues })}
                />
            </div>
        </form>
    );
};
