import React, { ReactElement, useState } from 'react';
import { Button } from '@sellerspot/universal-components';
import { InputField } from '@sellerspot/universal-components';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { apiService } from 'services';
import { API_ROUTES } from 'config/apiRoutes';
import { showNotify } from 'store/models/notify';
import { isNull, isUndefined } from 'lodash';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { handleSliderClose } from 'layouts/Dashboard/components/Sliders/Sliders';
import { cssColors } from 'config/cssVariables';
import { getAddBrandStyles } from './addBrand.styles';
import { cx } from '@emotion/css';

const formSchema = Yup.object().shape({
    brandName: Yup.string().required('Brand Name is a required field'),
});

// holds the initial values of the form
const formInitialValues = {
    brandName: '',
};

// holds the initial values for the customErrorMessage state
const customErrorMessagesInitialState: typeof formInitialValues = {
    brandName: null,
};

export const AddBrand = (): ReactElement => {
    // holds the server side validation error messages
    const [customErrorMessages, setCustomErrorMessages] = useState(customErrorMessagesInitialState);

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

    const styles = getAddBrandStyles();

    return (
        <form onSubmit={formFormik.handleSubmit} className={cx(styles.pageWrapper)} noValidate>
            <div className={styles.pageHeader}>
                <div
                    className={styles.pageHeaderBackIcon}
                    onClick={() => handleSliderClose('addBrandSlider')}
                >
                    <MdKeyboardArrowLeft size={'35px'} />
                </div>
            </div>
            <div className={styles.pageTitleBar}>Add Brand</div>
            <div className={styles.pageBody}>
                <div className={cx(styles.formGroup)}>
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
                        onChange={(event) => {
                            setCustomErrorMessages({
                                ...customErrorMessages,
                                brandName: null,
                            });
                            formFormik.setFieldValue('brandName', event.target.value);
                        }}
                    />
                </div>
            </div>
            <div className={styles.pageFooter}>
                <Button
                    type="submit"
                    status={formFormik.isSubmitting ? 'disabledLoading' : 'default'}
                    label={'Add Brand'}
                    tabIndex={0}
                    style={{
                        backgroundColor: cssColors['--inventory-color'],
                        color: cssColors['--light-font-color'],
                    }}
                />
                <Button
                    type="button"
                    status={formFormik.isSubmitting ? 'disabledLoading' : 'default'}
                    label="Reset Values"
                    style={{
                        backgroundColor: 'transparent',
                        borderColor: cssColors['--inventory-color'],
                        color: cssColors['--inventory-color'],
                    }}
                    onClick={() => {
                        setCustomErrorMessages(customErrorMessagesInitialState);
                        formFormik.resetForm({ values: formInitialValues });
                    }}
                />
            </div>
        </form>
    );
};
