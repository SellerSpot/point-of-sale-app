import React, { ReactElement } from 'react';
import { Button } from '../../../../components/Button/Button';
import { InputField } from '../../../../components/InputField/InputField';
import styles from './addtaxbracket.module.css';
import cn from 'classnames';
import * as Yup from 'yup';
import { useFormik } from 'formik';

export const AddTaxBracket = (): ReactElement => {
    const formSchema = Yup.object().shape({
        name: Yup.string().required('Tax Bracket Name is a required field'),
        percent: Yup.number()
            .min(0, 'Tax Bracket Percent must be more than or equal to 0')
            .required('Tax Bracket Percent is a required field'),
    });

    // holds the initial values of the form
    const initialValues = {
        name: '',
        percent: 0,
    };

    const formik = useFormik({
        initialValues,
        validationSchema: formSchema,
        onSubmit(values, { resetForm }) {
            alert(JSON.stringify(values));
            resetForm({
                values: initialValues,
            });
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className={cn(styles.pageWrapper)} noValidate>
            <div className={styles.pageHeader}>Add Category</div>
            <div className={styles.pageBody}>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Tax Bracket Name'}
                        placeHolder={'Tax Bracket Name'}
                        required={true}
                        value={formik.values.name}
                        error={{
                            errorMessage: formik.errors.name ?? '',
                            showError: formik.errors.name !== undefined,
                        }}
                        onChange={(value) => formik.setFieldValue('name', value)}
                    />
                </div>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'number'}
                        label={'Tax Bracket Percent'}
                        placeHolder={'Tax Bracket Percent'}
                        required={true}
                        value={formik.values.percent.toString()}
                        error={{
                            errorMessage: formik.errors.percent ?? '',
                            showError: formik.errors.percent !== undefined,
                        }}
                        onChange={(value) => formik.setFieldValue('percent', value)}
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
                    variant="outline"
                    backgroundColor="--inventory-color"
                    labelColor="--inventory-color"
                    onClick={() => formik.resetForm({ values: initialValues })}
                />
            </div>
        </form>
    );
};
