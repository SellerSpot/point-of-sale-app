import React, { ReactElement, useState } from 'react';
import { Button } from 'components/Button/Button';
import { InputField } from 'components/InputField/InputField';
import styles from './addbrand.module.css';
import cn from 'classnames';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { apiService } from 'services';
import { API_ROUTES } from 'config/apiRoutes';
import { showNotify } from 'store/models/notify';
import { isNull, isUndefined } from 'lodash';

interface ICustomErrorMessageState {
    brandName: string;
}

// holds the initial values for the customErrorMessage state
const customErrorMessagesInitialState: ICustomErrorMessageState = {
    brandName: null,
};

const formSchema = Yup.object().shape({
    brandName: Yup.string().required('Brand Name is a required field'),
});

// holds the initial values of the form
const formInitialValues = {
    brandName: '',
};

export const AddBrand = (): ReactElement => {
    // holds the server side validation error messages
    const [customErrorMessages, setCustomErrorMessages] = useState<ICustomErrorMessageState>(
        customErrorMessagesInitialState,
    );

    const formFormik = useFormik({
        initialValues: formInitialValues,
        validationSchema: formSchema,
        onSubmit(values) {
            handleSubmit(values);
        },
    });

    const handleSubmit = async (values: typeof formInitialValues) => {
        formFormik.setSubmitting(true);
        setCustomErrorMessages(customErrorMessagesInitialState);

        // sending API request
        const response = await apiService.post(API_ROUTES.BRAND, {
            brandName: values.brandName,
        });
        // parsing response
        if (response.status) {
            showNotify({ message: response.data as string, type: 'success' });
            formFormik.resetForm({ values: formInitialValues });
        } else {
            // setting custom error messages
            response.error.map((error) => {
                switch (error.fieldName) {
                    case 'brandName':
                        setCustomErrorMessages({
                            brandName: error.message,
                        });
                        break;
                }
            });
        }

        formFormik.setSubmitting(false);
    };

    return (
        <form onSubmit={formFormik.handleSubmit} className={cn(styles.pageWrapper)} noValidate>
            <div className={styles.pageHeader}>Add Brand</div>
            <div className={styles.pageBody}>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Brand Name'}
                        disabled={formFormik.isSubmitting}
                        placeHolder={'Brand Name'}
                        required={true}
                        value={formFormik.values.brandName}
                        error={{
                            errorMessage: isUndefined(formFormik.errors.brandName)
                                ? !isNull(customErrorMessages.brandName)
                                    ? customErrorMessages.brandName
                                    : ''
                                : formFormik.errors.brandName,
                            showError:
                                !isNull(customErrorMessages.brandName) ||
                                !isUndefined(formFormik.errors.brandName),
                        }}
                        onChange={(value) => {
                            setCustomErrorMessages({
                                ...customErrorMessages,
                                brandName: null,
                            });
                            formFormik.setFieldValue('brandName', value);
                        }}
                    />
                </div>
            </div>
            <div className={styles.pageFooter}>
                <Button
                    type="submit"
                    disabled={formFormik.isSubmitting}
                    shape={'rectangle'}
                    label={'Add Brand'}
                    variant={'solid'}
                    backgroundColor={'--inventory-color'}
                    labelColor={'--light-font-color'}
                />
                <Button
                    type="button"
                    disabled={formFormik.isSubmitting}
                    shape="rectangle"
                    label="Reset Values"
                    focusable={false}
                    variant="outline"
                    backgroundColor="--inventory-color"
                    labelColor="--inventory-color"
                    onClick={() => {
                        setCustomErrorMessages(customErrorMessagesInitialState);
                        formFormik.resetForm({ values: formInitialValues });
                    }}
                />
            </div>
        </form>
    );
};
