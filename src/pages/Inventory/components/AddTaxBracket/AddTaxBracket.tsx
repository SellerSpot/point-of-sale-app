import React, { ReactElement } from 'react';
import { Button } from '../../../../components/Button/Button';
import { InputField } from '../../../../components/InputField/InputField';
import styles from './addtaxbracket.module.css';
import cn from 'classnames';
import * as Yup from 'yup';
import { useFormik } from 'formik';

export const AddTaxBracket = (): ReactElement => {
    const formSchema = Yup.object().shape({
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
        validationSchema: formSchema,
        onSubmit(values, { resetForm }) {
            alert(JSON.stringify(values));
            resetForm({
                values: addTaxBracketInitialValues,
            });
        },
    });
    return (
        <form onSubmit={addTaxBracketFormik.handleSubmit} className={cn(styles.pageWrapper)} noValidate>
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
                            errorMessage: addTaxBracketFormik.errors.taxBracketName ?? '',
                            showError: addTaxBracketFormik.errors.taxBracketName !== undefined,
                        }}
                        onChange={(value) => addTaxBracketFormik.setFieldValue('taxBracketName', value)}
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
                            errorMessage: addTaxBracketFormik.errors.taxBracketPercent ?? '',
                            showError: addTaxBracketFormik.errors.taxBracketPercent !== undefined,
                        }}
                        onChange={(value) => addTaxBracketFormik.setFieldValue('taxBracketPercent', value)}
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
                    onClick={() => addTaxBracketFormik.resetForm({ values: addTaxBracketInitialValues })}
                />
            </div>
        </form>
    );
};
