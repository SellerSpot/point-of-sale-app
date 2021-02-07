import { useFormik } from 'formik';
import { isNull, isUndefined, last } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taxBracketRequests } from 'requests';
import { SLIDERS, closeSliderModal } from 'store/models/sliderModal';
import { RootState, store } from 'store/store';
import { COMMON_SYMBOLS, handleCloseSlider } from 'utilities/general';
import { showMessage } from 'utilities/notify';
import { generalUtilities } from 'utilities/utilities';
import { Button, InputField } from '@sellerspot/universal-components';
import styles from './addTaxBracket.module.scss';
import { AddTaxBracketFormSchema, IAddTaxBracketFormSchema } from './addTaxBracket.types';

// holds the initial values for the form
const formInitialValues: IAddTaxBracketFormSchema = {
    name: '',
    taxPercent: '',
};

export const AddTaxBracket = (): JSX.Element => {
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
        validationSchema: AddTaxBracketFormSchema,
        onSubmit: async (values: IAddTaxBracketFormSchema) => {
            formFormik.setSubmitting(true);
            const response = await taxBracketRequests.createTaxBracket(values);
            if (response.status) {
                showMessage('TaxBracket added to database!', 'success');
                formFormik.resetForm();
                setFocusInputField(true);
            } else {
                response.error.map((error) => {
                    formFormik.setFieldError(error.name, error.message);
                });
            }
            formFormik.setSubmitting(false);
        },
    });

    //# HOOKS

    // * to manage focus for inputFields
    useEffect(() => {
        if (sliderState.openSliders.includes(SLIDERS.addTaxBracketSlider)) {
            setFocusInputField(true);
            // checking if any autofill data is present
            if (!isNull(sliderState.sliders.addTaxBracketSlider.autoFillData)) {
                const autoFillData = sliderState.sliders.addTaxBracketSlider.autoFillData;
                // pushing data to formik state
                formFormik.setValues(autoFillData as IAddTaxBracketFormSchema);
            }
        }
    }, [sliderState.openSliders]);

    useEffect(() => {
        if (sliderState.callBackStateTrack.includes(SLIDERS.addTaxBracketSlider)) {
            // getting the topmost slider
            const topMostSlider = last(sliderState.openSliders);
            // only executing action if the top most slider is the current slider
            if (topMostSlider === SLIDERS.addTaxBracketSlider) {
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
            <div className={styles.pageTitleBar}>Add TaxBracket</div>
            <div className={styles.pageBody}>
                <div className={styles.formGroup}>
                    <InputField
                        focus={focusInputField}
                        setFocus={setFocusInputField}
                        name={'name' as keyof IAddTaxBracketFormSchema}
                        type={'text'}
                        label={'TaxBracket Name'}
                        placeHolder={'Eg.GST'}
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
                <div className={styles.formGroup}>
                    <InputField
                        name={'taxPercent' as keyof IAddTaxBracketFormSchema}
                        type={'text'}
                        label={'TaxBracket Percent'}
                        placeHolder={'Eg.8'}
                        suffix={<p>{COMMON_SYMBOLS.PERCENTAGE_SYMBOL}</p>}
                        required={true}
                        error={{
                            errorMessage: formFormik.errors.name ?? '',
                            showError:
                                !isUndefined(formFormik.errors.taxPercent) &&
                                formFormik.touched.taxPercent,
                        }}
                        selectTextOnFocus={true}
                        value={formFormik.values.taxPercent}
                        onBlur={formFormik.handleBlur}
                        onChange={formFormik.handleChange}
                    />
                </div>
            </div>
            <div className={styles.pageFooter}>
                <Button
                    type="submit"
                    status={formFormik.isSubmitting ? 'disabledLoading' : 'default'}
                    label={'Add TaxBracket'}
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
