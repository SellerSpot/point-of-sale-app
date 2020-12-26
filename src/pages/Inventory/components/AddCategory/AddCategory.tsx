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
import { isNull, isUndefined } from 'lodash';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toggleSliderModal } from 'store/models/sliderModal';
import { handleSliderClose } from 'config/config';

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

    return (
        <form onSubmit={formFormik.handleSubmit} className={cn(styles.pageWrapper)} noValidate>
            <div className={styles.pageHeader}>
                <div
                    className={styles.pageHeaderBackIcon}
                    onClick={() => handleSliderClose('addCategorySlider')}
                >
                    <MdKeyboardArrowLeft size={'35px'} />
                </div>
            </div>
            <div className={styles.pageTitleBar}>Add Category</div>
            <div className={styles.pageBody}>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Category Name'}
                        placeHolder={'Category Name'}
                        required={true}
                        value={formFormik.values.categoryName}
                        error={{
                            errorMessage: isUndefined(formFormik.errors.categoryName)
                                ? !isNull(customErrorMessages.categoryName)
                                    ? customErrorMessages.categoryName
                                    : ''
                                : formFormik.errors.categoryName,
                            showError:
                                !isNull(customErrorMessages.categoryName) ||
                                !isUndefined(formFormik.errors.categoryName),
                        }}
                        onChange={(value) => {
                            setCustomErrorMessages({
                                ...customErrorMessages,
                                categoryName: null,
                            });
                            formFormik.setFieldValue('categoryName', value);
                        }}
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
                    onClick={() => {
                        setCustomErrorMessages(customErrorMessagesInitialState);
                        formFormik.resetForm({ values: formInitialValues });
                    }}
                />
            </div>
        </form>
    );
};
