import { useFormik } from 'formik';
import { isUndefined } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSelector } from 'react-redux';
import { taxBracketRequests } from 'requests';
import { toggleSliderModal } from 'store/models/sliderModal';
import { RootState, store } from 'store/store';
import { COMMON_SYMBOLS } from 'utilities/general';
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

/**
 * Interface for props to recieve the state values which are operated by the callbacks from the slider modal
 * Callbacks operating the props state - onEscClick & onBackdropClick
 */
export interface IAddTaxBracketProps {
    callBackStateTrack: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
export const AddTaxBracket = (props: IAddTaxBracketProps): JSX.Element => {
    //# VALUE HOOKS

    // getting sliderState to listen to when the slider is invoked
    const sliderState = useSelector((state: RootState) => state.sliderModal);
    // state to manage the focus state of the first inputField
    const [focusInputField, setFocusInputField] = useState(false);

    //# CRITICAL FUCNTIONS

    // used to handle the closing of the sliderModal
    const handleCloseSlider = () => {
        store.dispatch(
            toggleSliderModal({
                sliderName: 'addTaxBracketSlider',
                active: false,
            }),
        );
        props.callBackStateTrack[1](false);
    };

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
        if (sliderState.addTaxBracketSlider.show) {
            setFocusInputField(true);
        }
    }, [sliderState.addTaxBracketSlider.show]);

    useEffect(() => {
        if (props.callBackStateTrack[0]) {
            handleCloseSlider();
        }
    }, [props.callBackStateTrack[0]]);

    // * Used to contol slider models visibility
    useHotkeys(
        generalUtilities.GLOBAL_KEYBOARD_SHORTCUTS.ADD_TAXBRACKET,
        (event) => {
            event.preventDefault();
            store.dispatch(
                toggleSliderModal({
                    sliderName: 'addTaxBracketSlider',
                    active: true,
                }),
            );
        },
        {
            enableOnTags: ['INPUT', 'SELECT', 'TEXTAREA'],
        },
    );

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
