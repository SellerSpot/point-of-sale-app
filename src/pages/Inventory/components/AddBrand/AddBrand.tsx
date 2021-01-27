import { Button, InputField } from '@sellerspot/universal-components';
import { cssColors } from 'config/cssVariables';
import { useFormik } from 'formik';
import lodash from 'lodash';
import React, { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSelector } from 'react-redux';
import { toggleSliderModal } from 'store/models/sliderModal';
import { RootState, store } from 'store/store';
import { AddBrandFormSchema, IAddBrandFormSchema } from 'typings/components/brand.types';
import { GLOBAL_KEYBOARD_SHORTCUTS } from 'utilities/keyboardShortcuts';
import styles from './addBrand.module.css';

// holds the initial values for the form
const formInitialValues: IAddBrandFormSchema = {
    name: '',
};

/**
 * Interface for props to recieve the state values which are operated by the callbacks from the slider modal
 * Callbacks operating the props state - onEscClick & onBackdropClick
 */
export interface IAddBrandProps {
    callBackStateTrack: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
export const AddBrand = (props: IAddBrandProps): JSX.Element => {
    // used to handle the closing of the sliderModal
    const handleCloseSlider = () => {
        store.dispatch(
            toggleSliderModal({
                sliderName: 'addBrandSlider',
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

    useHotkeys(GLOBAL_KEYBOARD_SHORTCUTS.ADD_BRAND, () => {
        store.dispatch(
            toggleSliderModal({
                sliderName: 'addBrandSlider',
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
        validationSchema: AddBrandFormSchema,
        onSubmit: (values: IAddBrandFormSchema) => {
            console.log(values);
        },
    });

    return (
        <form onSubmit={formFormik.handleSubmit} className={styles.pageWrapper} noValidate>
            <div className={styles.pageTitleBar}>Add Brand</div>
            <div className={styles.pageBody}>
                <div className={styles.formGroup}>
                    <InputField
                        name={'name'}
                        type={'text'}
                        label={'Brand Name'}
                        placeHolder={'Eg.Pepsi'}
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
