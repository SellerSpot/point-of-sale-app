import { Button, InputField } from '@sellerspot/universal-components';
import { cssColors } from 'config/cssVariables';
import { useFormik } from 'formik';
import lodash from 'lodash';
import React, { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSelector } from 'react-redux';
import { toggleSliderModal } from 'store/models/sliderModal';
import { RootState, store } from 'store/store';
import {
    AddTaxBracketFormSchema,
    IAddTaxBracketFormSchema,
} from 'typings/components/taxBracket.types';
import { GLOBAL_KEYBOARD_SHORTCUTS } from 'utils/keyboardShortcuts';
import styles from './addTaxBracket.module.css';

// holds the initial values for the form
const formInitialValues: IAddTaxBracketFormSchema = {
    name: '',
    taxPercent: 0,
};

/**
 * Interface for props to recieve the state values which are operated by the callbacks from the slider modal
 * Callbacks operating the props state - onEscClick & onBackdropClick
 */
export interface IAddTaxBracketProps {
    callBackStateTrack: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
export const AddTaxBracket = (props: IAddTaxBracketProps): JSX.Element => {
    // used to handle the closing of the sliderModal
    const handleCloseSlider = () => {
        store.dispatch(
            toggleSliderModal({
                sliderName: 'addTaxBracketSlider',
                active: false,
                autoFillData: null,
            }),
        );
        props.callBackStateTrack[1](false);
    };

    useEffect(() => {
        if (props.callBackStateTrack[0]) {
            handleCloseSlider();
        }
    }, [props.callBackStateTrack[0]]);

    useHotkeys(GLOBAL_KEYBOARD_SHORTCUTS.ADD_TAXBRACKET, () => {
        store.dispatch(
            toggleSliderModal({
                sliderName: 'addTaxBracketSlider',
                active: true,
                autoFillData: null,
            }),
        );
    });

    // getting sliderState to listen to when the slider is invoked
    const sliderState = useSelector((state: RootState) => state.sliderModal);
    // getting formik instance to handle form operations
    const formFormik = useFormik({
        initialValues: formInitialValues,
        validationSchema: AddTaxBracketFormSchema,
        onSubmit: (values: IAddTaxBracketFormSchema) => {
            console.log(values);
        },
    });

    return (
        <form onSubmit={formFormik.handleSubmit} className={styles.pageWrapper} noValidate>
            <div className={styles.pageTitleBar}>Add TaxBracket</div>
            <div className={styles.pageBody}>
                <div className={styles.formGroup}>
                    <InputField
                        name={'name'}
                        type={'text'}
                        label={'TaxBracket Name'}
                        placeHolder={'Eg. CESS'}
                        required={true}
                        error={{
                            errorMessage: formFormik.errors.name ?? '',
                            showError:
                                !lodash.isUndefined(formFormik.errors.name) &&
                                formFormik.touched.name,
                        }}
                        selectTextOnFocus={true}
                        value={formFormik.values.name}
                        onBlur={formFormik.handleBlur}
                        onChange={formFormik.handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <InputField
                        name={'taxPercent'}
                        type={'number'}
                        label={'TaxBracket Percent'}
                        placeHolder={'Eg. 10%'}
                        suffix={<p>%</p>}
                        required={true}
                        error={{
                            errorMessage: formFormik.errors.taxPercent ?? '',
                            showError:
                                !lodash.isUndefined(formFormik.errors.taxPercent) &&
                                formFormik.touched.taxPercent,
                        }}
                        selectTextOnFocus={true}
                        value={formFormik.values.taxPercent.toString()}
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
                    style={{
                        backgroundColor: cssColors['--inventory-color'],
                        color: cssColors['--light-font-color'],
                    }}
                />
                <Button
                    type="button"
                    status={formFormik.isSubmitting ? 'disabled' : 'default'}
                    label="Reset Values"
                    style={{
                        backgroundColor: 'transparent',
                        borderColor: cssColors['--inventory-color'],
                        color: cssColors['--inventory-color'],
                    }}
                    onClick={() => {
                        formFormik.resetForm({ values: formInitialValues });
                    }}
                />
            </div>
        </form>
    );
};
