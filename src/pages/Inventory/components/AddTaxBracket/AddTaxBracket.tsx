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
    });

    const taxBracketNameFormik = useFormik({
        initialValues: {
            taxBracketName: '',
        },
        validationSchema: formSchema,
        onSubmit(values) {
            alert(JSON.stringify(values));
        },
    });
    return (
        <div className={cn(styles.addTaxBracketWrapper)}>
            <form onSubmit={taxBracketNameFormik.handleSubmit} className={styles.addTaxBracketForm} noValidate>
                <div className={cn(styles.taxBracketInputFieldWrapper)}>
                    <InputField
                        label={'Tax Bracket Name'}
                        placeHolder={'Tax Bracket Name'}
                        error={{
                            errorMessage: taxBracketNameFormik.errors.taxBracketName ?? '',
                            showError: taxBracketNameFormik.errors.taxBracketName !== undefined,
                        }}
                        value={taxBracketNameFormik.values.taxBracketName}
                        onChange={(value) => taxBracketNameFormik.setFieldValue('taxBracketName', value)}
                    />
                </div>
                <div className={cn(styles.submitTaxBracketNameWrapper)}>
                    <Button
                        label={'Add TaxBracket'}
                        variant={'outline'}
                        labelColor={'--inventory-color'}
                        backgroundColor={'--inventory-color'}
                        type="submit"
                        onClick={() => void 0}
                    />
                </div>
            </form>
        </div>
    );
};
