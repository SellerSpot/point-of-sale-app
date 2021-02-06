import { Formik, useFormik } from 'formik';
import { TCallBackStateTrack } from 'layouts/Dashboard/components/Sliders/Sliders';
import { isNull, isUndefined } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { brandRequests, categoryRequests, stockUnitRequests } from 'requests';
import { SLIDERS, closeSliderModal } from 'store/models/sliderModal';
import { RootState, store } from 'store/store';
import { showMessage } from 'utilities/notify';
import { generalUtilities } from 'utilities/utilities';
import { Button, InputField } from '@sellerspot/universal-components';
import styles from './addStockUnit.module.scss';
import { AddStockUnitFormSchema, IAddStockUnitFormSchema } from './addStockUnit.types';

// holds the initial values for the form
const formInitialValues: IAddStockUnitFormSchema = {
    name: '',
};

/**
 * Interface for props to recieve the state values which are operated by the callbacks from the slider modal
 * Callbacks operating the props state - onEscClick & onBackdropClick
 */
export interface IAddStockUnitProps {
    callBackStateTrack: [
        TCallBackStateTrack,
        React.Dispatch<React.SetStateAction<TCallBackStateTrack>>,
    ];
}
export const AddStockUnit = (props: IAddStockUnitProps): JSX.Element => {
    //# VALUE HOOKS

    // getting sliderState to listen to when the slider is invoked
    const sliderState = useSelector((state: RootState) => state.sliderModal);
    // state to manage the focus state of the first inputField
    const [focusInputField, setFocusInputField] = useState(false);
    // store dispatch
    const dispatch = useDispatch();
    //# CRITICAL FUCNTIONS

    //* used to handle the closing of the sliderModal
    const handleCloseSlider = () => {
        dispatch(
            closeSliderModal({
                sliderName: SLIDERS.addStockUnitSlider,
            }),
        );
        props.callBackStateTrack[1]({
            ...props.callBackStateTrack[0],
            addStockUnitSlider: false,
        });
    };

    //* getting formik instance to handle form operations
    const formFormik = useFormik({
        initialValues: formInitialValues,
        validationSchema: AddStockUnitFormSchema,
        onSubmit: async (values: IAddStockUnitFormSchema) => {
            formFormik.setSubmitting(true);
            const response = await stockUnitRequests.createStockUnit(values);
            if (response.status) {
                showMessage('Stock Unit added to database!', 'success');
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

    //* to manage focus for inputFields
    useEffect(() => {
        if (sliderState.openSliders.includes(SLIDERS.addStockUnitSlider)) {
            setFocusInputField(true);
            // checking if any autofill data is present
            if (!isNull(sliderState.sliders.addStockUnitSlider.autoFillData)) {
                const autoFillData = sliderState.sliders.addStockUnitSlider.autoFillData;
                // pushing data to formik state
                formFormik.setValues(autoFillData as IAddStockUnitFormSchema);
            }
        }
    }, [sliderState.openSliders]);

    //* callback to close the slider
    useEffect(() => {
        if (props.callBackStateTrack[0].addStockUnitSlider) {
            handleCloseSlider();
        }
    }, [props.callBackStateTrack[0].addStockUnitSlider]);

    return (
        <form onSubmit={formFormik.handleSubmit} className={styles.pageWrapper} noValidate>
            <div className={styles.pageTitleBar}>Add Stock Unit</div>
            <div className={styles.pageBody}>
                <div className={styles.formGroup}>
                    <InputField
                        focus={focusInputField}
                        setFocus={setFocusInputField}
                        name={'name'}
                        type={'text'}
                        label={'Stock Unit Name'}
                        placeHolder={'Eg.KG'}
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
                    status={formFormik.isSubmitting ? 'disabledLoading' : 'default'}
                    label={'Add Stock Unit'}
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
