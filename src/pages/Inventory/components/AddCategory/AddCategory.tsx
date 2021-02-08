import { useFormik } from 'formik';
import { isNull, isUndefined, last } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoryRequests } from 'requests';
import { SLIDERS, closeSliderModal } from 'store/models/sliderModal';
import { RootState } from 'store/store';
import { handleCloseSlider } from 'utilities/general';
import { showMessage } from 'utilities/notify';
import { Button, InputField } from '@sellerspot/universal-components';
import styles from './addCategory.module.scss';
import { AddCategoryFormSchema, IAddCategoryFormSchema } from './addCategory.types';

// holds the initial values for the form
const formInitialValues: IAddCategoryFormSchema = {
    name: '',
};

export const AddCategory = (): JSX.Element => {
    //# VALUE HOOKS

    // getting sliderState to listen to when the slider is invoked
    const sliderState = useSelector((state: RootState) => state.sliderModal);
    // state to manage the focus state of the first inputField
    const [focusInputField, setFocusInputField] = useState(false);
    // store dispatch
    const dispatch = useDispatch();

    //# CRITICAL FUCNTIONS

    // getting formik instance to handle form operations
    const formFormik = useFormik({
        initialValues: formInitialValues,
        validationSchema: AddCategoryFormSchema,
        onSubmit: async (values: IAddCategoryFormSchema) => {
            formFormik.setSubmitting(true);

            if (!isNull(sliderState.sliders.addCategorySlider.autoFillData)) {
                const response = await categoryRequests.updateCategory(values);
                if (response.status) {
                    showMessage('Category Updated!', 'success');
                    dispatch(
                        closeSliderModal({
                            sliderName: SLIDERS.addCategorySlider,
                        }),
                    );
                } else {
                    response.error.map((error) => {
                        formFormik.setFieldError(error.name, error.message);
                    });
                }
            } else {
                const response = await categoryRequests.createCategory(values);
                if (response.status) {
                    showMessage('Category added to database!', 'success');
                    formFormik.resetForm();
                    setFocusInputField(true);
                } else {
                    response.error.map((error) => {
                        formFormik.setFieldError(error.name, error.message);
                    });
                }
            }

            formFormik.setSubmitting(false);
        },
    });

    //# HOOKS

    // * to manage focus for inputFields
    useEffect(() => {
        if (sliderState.openSliders.includes(SLIDERS.addCategorySlider)) {
            setFocusInputField(true);
            // checking if any autofill data is present
            if (!isNull(sliderState.sliders.addCategorySlider.autoFillData)) {
                const autoFillData = sliderState.sliders.addCategorySlider.autoFillData;
                // pushing data to formik state
                formFormik.setValues(autoFillData as IAddCategoryFormSchema);
            }
        }
    }, [sliderState.openSliders]);

    useEffect(() => {
        if (sliderState.callBackStateTrack.includes(SLIDERS.addCategorySlider)) {
            // getting the topmost slider
            const topMostSlider = last(sliderState.openSliders);
            // only executing action if the top most slider is the current slider
            if (topMostSlider === SLIDERS.addCategorySlider) {
                handleCloseSlider({
                    callBackStateTrack: sliderState.callBackStateTrack,
                    sliderState,
                    topMostSlider,
                });
            }
        }
    }, [sliderState.callBackStateTrack]);

    return (
        <form onSubmit={formFormik.handleSubmit} className={styles.pageWrapper} noValidate>
            <div className={styles.pageTitleBar}>Add Category</div>
            <div className={styles.pageBody}>
                <div className={styles.formGroup}>
                    <InputField
                        focus={focusInputField}
                        setFocus={setFocusInputField}
                        name={'name'}
                        type={'text'}
                        label={'Category Name'}
                        placeHolder={'Eg.Drinks'}
                        required={true}
                        error={{
                            errorMessage: formFormik.errors.name ?? '',
                            showError:
                                !isUndefined(formFormik.errors.name) && formFormik.touched.name,
                        }}
                        selectTextOnFocus={true}
                        value={formFormik.values.name}
                        onBlur={formFormik.handleBlur}
                        onChange={formFormik.handleChange}
                    />
                </div>
            </div>
            <div className={styles.pageFooter}>
                <Button
                    type="submit"
                    onClick={(_) => {
                        formFormik.submitForm();
                    }}
                    status={formFormik.isSubmitting ? 'disabledLoading' : 'default'}
                    label={
                        !isNull(sliderState.sliders.addCategorySlider.autoFillData)
                            ? 'Update Category'
                            : 'Add Category'
                    }
                    tabIndex={0}
                />
                <Button
                    type="button"
                    status={formFormik.isSubmitting ? 'disabled' : 'default'}
                    label="Reset Values"
                    onClick={() => {
                        formFormik.resetForm({ values: formInitialValues });
                    }}
                />
            </div>
        </form>
    );
};
