import React, { ReactElement, useState } from 'react';
import { Button } from '../../../../components/Button/Button';
import { InputField } from '../../../../components/InputField/InputField';
import styles from './addtaxbracket.module.css';
import cn from 'classnames';
import * as Yup from 'yup';
import { useFormik } from 'formik';

export const AddTaxBracket = (): ReactElement => {
    const [customErrorFlag, setCustomErrorFlag] = useState<boolean>(false);
    const [customErrorMessage, setCustomErrorMessage] = useState<string>('');

    const addTaxBracketFormSchema = Yup.object().shape({
        taxBracketName: Yup.string().required('Tax Bracket Name is a required field'),
        taxBracketPercent: Yup.number()
            .min(0, 'Tax Bracket Percent must be more than or equal to 0')
            .required('Tax Bracket Percent is a required field'),
    });

    // holds the initial values of the form
    const addTaxBracketInitialValues = {
        taxBracketName: '',
        taxBracketPercent: 0,
    };

    const addTaxBracketFormik = useFormik({
        initialValues: addTaxBracketInitialValues,
        validationSchema: addTaxBracketFormSchema,
        onSubmit(values, { resetForm }) {
            alert(JSON.stringify(values));
            resetForm({
                values: addTaxBracketInitialValues,
            });
        },
    });

    // // used to assign the error messages to the right field
    // const handleAddTeaxBracketFormErrorMessage = () => {};

    // used to decide if the particular field should show errors
    const handleAddTaxBracketFormShowError = (
        fieldName: keyof typeof addTaxBracketInitialValues,
    ): boolean => {
        if (customErrorFlag) {
            if (fieldName === 'taxBracketName') {
                return true;
            } else {
                return false;
            }
        }
        return false;
    };

    return (
        <form
            onSubmit={addTaxBracketFormik.handleSubmit}
            className={cn(styles.pageWrapper)}
            noValidate
        >
            <div className={styles.pageHeader}>Add Category</div>
            <div className={styles.pageBody}>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Tax Bracket Name'}
                        placeHolder={'Tax Bracket Name'}
                        required={true}
                        value={addTaxBracketFormik.values.taxBracketName}
                        error={{
                            errorMessage:
                                addTaxBracketFormik.errors.taxBracketName === undefined
                                    ? customErrorFlag
                                        ? customErrorMessage
                                        : ''
                                    : addTaxBracketFormik.errors.taxBracketName,
                            showError: handleAddTaxBracketFormShowError('taxBracketName'),
                        }}
                        onChange={(value) =>
                            addTaxBracketFormik.setFieldValue('taxBracketName', value)
                        }
                    />
                </div>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'number'}
                        label={'Tax Bracket Percent'}
                        placeHolder={'Tax Bracket Percent'}
                        required={true}
                        value={addTaxBracketFormik.values.taxBracketPercent.toString()}
                        error={{
                            errorMessage:
                                addTaxBracketFormik.errors.taxBracketName === undefined
                                    ? customErrorFlag
                                        ? customErrorMessage
                                        : ''
                                    : addTaxBracketFormik.errors.taxBracketName,
                            showError:
                                customErrorFlag ||
                                addTaxBracketFormik.errors.taxBracketName !== undefined,
                        }}
                        onChange={(value) =>
                            addTaxBracketFormik.setFieldValue('taxBracketPercent', value)
                        }
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
                    onClick={() =>
                        addTaxBracketFormik.resetForm({ values: addTaxBracketInitialValues })
                    }
                />
            </div>
        </form>
    );
};
