import React, { ReactElement, useState } from 'react';
import { Button } from 'components/Button/Button';
import { InputField } from 'components/InputField/InputField';
import styles from './addtaxbracket.module.css';
import cn from 'classnames';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { isNull, isUndefined } from 'lodash';
import { apiService } from 'services';
import { API_ROUTES } from 'config/apiRoutes';
import { showNotify } from 'store/models/notify';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { handleSliderClose } from 'config/config';

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

    return (
        <form onSubmit={formFormik.handleSubmit} className={cn(styles.pageWrapper)} noValidate>
            <div className={styles.pageHeader}>
                <div
                    className={styles.pageHeaderBackIcon}
                    onClick={() => handleSliderClose('addTaxBracketSlider')}
                >
                    <MdKeyboardArrowLeft size={'35px'} />
                </div>
            </div>
            <div className={styles.pageTitleBar}>Add Tax Brackets</div>
            <div className={styles.pageBody}>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Tax Bracket Name'}
                        placeHolder={'Tax Bracket Name'}
                        required={true}
                        value={formFormik.values.name}
                        error={{
                            errorMessage: isUndefined(formFormik.errors.name)
                                ? !isNull(customErrorMessages.name)
                                    ? customErrorMessages.name
                                    : ''
                                : formFormik.errors.name,
                            showError:
                                !isNull(customErrorMessages.name) ||
                                !isUndefined(formFormik.errors.name),
                        }}
                        onChange={(value) => {
                            setCustomErrorMessages({
                                ...customErrorMessages,
                                name: null,
                            });
                            formFormik.setFieldValue('name', value);
                        }}
                    />
                </div>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'number'}
                        label={'Tax Bracket Percent'}
                        placeHolder={'Tax Bracket Percent'}
                        required={true}
                        value={formFormik.values.taxPercent.toString()}
                        error={{
                            errorMessage: isUndefined(formFormik.errors.taxPercent)
                                ? !isNull(customErrorMessages.taxPercent)
                                    ? customErrorMessages.taxPercent
                                    : ''
                                : formFormik.errors.taxPercent,
                            showError:
                                !isNull(customErrorMessages.taxPercent) ||
                                !isUndefined(formFormik.errors.taxPercent),
                        }}
                        onChange={(value) => {
                            setCustomErrorMessages({
                                ...customErrorMessages,
                                taxPercent: null,
                            });
                            formFormik.setFieldValue('taxPercent', value);
                        }}
                    />
                </div>
            </div>
            <div className={styles.pageFooter}>
                <Button
                    type="submit"
                    shape="rectangle"
                    label="Add Tax Bracket"
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
                    onClick={() => {
                        setCustomErrorMessages(customErrorMessagesInitialState);
                        formFormik.resetForm({ values: formInitialValues });
                    }}
                />
            </div>
        </form>
    );
};
