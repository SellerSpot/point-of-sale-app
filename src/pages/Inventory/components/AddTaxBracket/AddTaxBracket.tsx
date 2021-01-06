/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState } from 'react';
import { Button } from '@sellerspot/universal-components';
import { InputField } from '@sellerspot/universal-components';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import lodash from 'lodash';
import { apiService } from 'services';
import { API_ROUTES } from 'config/apiRoutes';
import { showNotify } from 'store/models/notify';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { cssColors } from 'config/cssVariables';
import { getAddTaxBracketStyles } from './addTaxBracket.styles';
import { cx } from '@emotion/css';
import { handleSliderClose } from 'layouts/Dashboard/components/Sliders/Sliders';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const formSchema = Yup.object().shape({
    name: Yup.string().required('Tax Bracket Name is a required field'),
    taxPercent: Yup.number()
        .min(0, 'Tax Bracket Percent must be more than or equal to 0')
        .max(100, 'Tax Bracket Percent must be less than or equal to 100')
        .required('Tax Bracket Percent is a required field'),
});

// holds the initial values of the form
const formInitialValues = {
    name: '',
    taxPercent: '',
};

// holds the initial values for the customErrorMessage state
const customErrorMessagesInitialState: typeof formInitialValues = {
    name: null,
    taxPercent: null,
};

export const AddTaxBracket = (): ReactElement => {
    // holds the server side validation error messages
    const [customErrorMessages, setCustomErrorMessages] = useState(customErrorMessagesInitialState);
    const sliderState = useSelector((state: RootState) => state.sliderModal);

    const formFormik = useFormik({
        initialValues: formInitialValues,
        validationSchema: formSchema,
        onSubmit(values) {
            handleSubmit(values);
        },
    });

    useEffect(() => {
        if (!lodash.isUndefined(sliderState.addTaxBracketSlider.autoFillData))
            formFormik.setValues({
                name: sliderState.addTaxBracketSlider.autoFillData?.name,
                taxPercent: sliderState.addTaxBracketSlider.autoFillData?.taxPercent,
            });
        else formFormik.resetForm();
    }, [sliderState.addTaxBracketSlider.autoFillData]);

    const handleSubmit = async (values: typeof formInitialValues) => {
        formFormik.setSubmitting(true);
        setCustomErrorMessages(customErrorMessagesInitialState);

        // sending API request
        const response = await apiService.post(API_ROUTES.TAXBRACKET, {
            name: values.name,
            taxPercent: values.taxPercent,
        });

        // parsing response
        if (response.status) {
            showNotify({ message: response.data as string, type: 'success' });
            formFormik.resetForm({ values: formInitialValues });
        } else {
            // setting custom error messages
            response.error.map((error) => {
                switch (error.fieldName) {
                    case 'name':
                        setCustomErrorMessages({
                            ...customErrorMessages,
                            name: error.message,
                        });
                        break;
                    case 'taxPercent':
                        setCustomErrorMessages({
                            ...customErrorMessages,
                            taxPercent: error.message,
                        });
                        break;
                }
            });
        }

        formFormik.setSubmitting(false);
    };

    const styles = getAddTaxBracketStyles();

    return (
        <form onSubmit={formFormik.handleSubmit} className={cx(styles.pageWrapper)} noValidate>
            <div className={styles.pageHeader}>
                <div
                    className={styles.pageHeaderBackIcon}
                    onClick={() => handleSliderClose('addTaxBracketSlider')}
                >
                    <MdKeyboardArrowLeft size={'35px'} />
                </div>
            </div>
            <div className={styles.pageTitleBar}>
                {lodash.isUndefined(sliderState.addTaxBracketSlider.autoFillData)
                    ? 'Add Tax Bracket'
                    : 'Edit Tax Bracket'}
            </div>
            <div className={styles.pageBody}>
                <div className={cx(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Tax Bracket Name'}
                        placeHolder={'Tax Bracket Name'}
                        required={true}
                        value={formFormik.values.name}
                        error={{
                            errorMessage: lodash.isUndefined(formFormik.errors.name)
                                ? !lodash.isNull(customErrorMessages.name)
                                    ? customErrorMessages.name
                                    : ''
                                : formFormik.errors.name,
                            showError:
                                !lodash.isNull(customErrorMessages.name) ||
                                !lodash.isUndefined(formFormik.errors.name),
                        }}
                        onChange={(event) => {
                            setCustomErrorMessages({
                                ...customErrorMessages,
                                name: null,
                            });
                            formFormik.setFieldValue('name', event.target.value);
                        }}
                    />
                </div>
                <div className={cx(styles.formGroup)}>
                    <InputField
                        type={'number'}
                        label={'Tax Bracket Percent'}
                        placeHolder={'Tax Bracket Percent'}
                        required={true}
                        value={formFormik.values.taxPercent?.toString()}
                        error={{
                            errorMessage: lodash.isUndefined(formFormik.errors.taxPercent)
                                ? !lodash.isNull(customErrorMessages.taxPercent)
                                    ? customErrorMessages.taxPercent
                                    : ''
                                : formFormik.errors.taxPercent,
                            showError:
                                !lodash.isNull(customErrorMessages.taxPercent) ||
                                !lodash.isUndefined(formFormik.errors.taxPercent),
                        }}
                        onChange={(event) => {
                            setCustomErrorMessages({
                                ...customErrorMessages,
                                taxPercent: null,
                            });
                            formFormik.setFieldValue('taxPercent', event.target.value);
                        }}
                    />
                </div>
            </div>
            <div className={styles.pageFooter}>
                <Button
                    type="submit"
                    status={formFormik.isSubmitting ? 'disabledLoading' : 'default'}
                    label={
                        lodash.isUndefined(sliderState.addTaxBracketSlider.autoFillData)
                            ? 'Add Tax Bracket'
                            : 'Edit Tax Bracket'
                    }
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
