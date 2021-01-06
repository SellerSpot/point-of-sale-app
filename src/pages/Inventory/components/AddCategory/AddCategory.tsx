/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState } from 'react';
import { Button } from '@sellerspot/universal-components';
import { InputField } from '@sellerspot/universal-components';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { API_ROUTES } from 'config/apiRoutes';
import { apiService } from 'services';
import { showNotify } from 'store/models/notify';
import lodash from 'lodash';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSliderModal } from 'store/models/sliderModal';
import { handleSliderClose } from 'layouts/Dashboard/components/Sliders/Sliders';
import { cssColors } from 'config/cssVariables';
import { getAddCategoryStyles } from './addCategory.styles';
import { cx } from '@emotion/css';
import { RootState } from 'store/store';

const formSchema = Yup.object().shape({
    categoryName: Yup.string().required('Category Name is a required field'),
});

// holds the initial values of the form
const formInitialValues = {
    categoryName: '',
};

// holds the initial values for the customErrorMessage state
const customErrorMessagesInitialState: typeof formInitialValues = {
    categoryName: null,
};

export const AddCategory = (): ReactElement => {
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
        if (!lodash.isUndefined(sliderState.addCategorySlider.autoFillData))
            formFormik.setValues({
                categoryName: sliderState.addCategorySlider.autoFillData?.name,
            });
        else formFormik.resetForm();
    }, [sliderState.addCategorySlider.autoFillData]);

    const handleSubmit = async (values: typeof formInitialValues) => {
        formFormik.setSubmitting(true);
        setCustomErrorMessages(customErrorMessagesInitialState);

        // sending API request
        const response = await apiService.post(API_ROUTES.CATEGORY, {
            categoryName: values.categoryName,
        });
        // parsing response
        if (response.status) {
            showNotify({ message: response.data as string, type: 'success' });
            formFormik.resetForm({ values: formInitialValues });
        } else {
            // setting custom error messages
            response.error.map((error) => {
                switch (error.fieldName) {
                    case 'categoryName':
                        setCustomErrorMessages({
                            categoryName: error.message,
                        });
                        break;
                }
            });
        }

        formFormik.setSubmitting(false);
    };

    const styles = getAddCategoryStyles();

    return (
        <form onSubmit={formFormik.handleSubmit} className={cx(styles.pageWrapper)} noValidate>
            <div className={styles.pageHeader}>
                <div
                    className={styles.pageHeaderBackIcon}
                    onClick={() => handleSliderClose('addCategorySlider')}
                >
                    <MdKeyboardArrowLeft size={'35px'} />
                </div>
            </div>
            <div className={styles.pageTitleBar}>
                {lodash.isUndefined(sliderState.addCategorySlider.autoFillData)
                    ? 'Add Category'
                    : 'Edit Category'}
            </div>
            <div className={styles.pageBody}>
                <div className={cx(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Category Name'}
                        placeHolder={'Category Name'}
                        required={true}
                        value={formFormik.values.categoryName}
                        error={{
                            errorMessage: lodash.isUndefined(formFormik.errors.categoryName)
                                ? !lodash.isNull(customErrorMessages.categoryName)
                                    ? customErrorMessages.categoryName
                                    : ''
                                : formFormik.errors.categoryName,
                            showError:
                                !lodash.isNull(customErrorMessages.categoryName) ||
                                !lodash.isUndefined(formFormik.errors.categoryName),
                        }}
                        onChange={(event) => {
                            setCustomErrorMessages({
                                ...customErrorMessages,
                                categoryName: null,
                            });
                            formFormik.setFieldValue('categoryName', event.target.value);
                        }}
                    />
                </div>
            </div>
            <div className={styles.pageFooter}>
                <Button
                    type="submit"
                    status={formFormik.isSubmitting ? 'disabledLoading' : 'default'}
                    label={
                        lodash.isUndefined(sliderState.addCategorySlider.autoFillData)
                            ? 'Add Category'
                            : 'Edit Category'
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
