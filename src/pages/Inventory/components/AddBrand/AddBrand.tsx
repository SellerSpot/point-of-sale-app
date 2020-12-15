import React, { ReactElement } from 'react';
import { Button } from '../../../../components/Button/Button';
import { InputField } from '../../../../components/InputField/InputField';
import styles from './addbrand.module.css';
import cn from 'classnames';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import { apiService } from '../../../../services';
// import { API_ROUTES } from '../../../../config/apiRoutes';

export const AddBrand = (): ReactElement => {
    const formSchema = Yup.object().shape({
        brandName: Yup.string().required('Brand Name is a required field'),
    });

    const brandNameFormik = useFormik({
        initialValues: {
            brandName: '',
        },
        validationSchema: formSchema,
        onSubmit(values) {
            alert(values);
            // apiService.post(API_ROUTES.ADDBRAND, {
            //     brandName: values.brandName,
            // });
        },
    });
    return (
        <div className={cn(styles.addBrandWrapper)}>
            <form onSubmit={brandNameFormik.handleSubmit} className={styles.addBrandForm} noValidate>
                <div className={cn(styles.brandInputFieldWrapper)}>
                    <InputField
                        label={'Brand Name'}
                        placeHolder={'Brand Name'}
                        error={{
                            errorMessage: brandNameFormik.errors.brandName ?? '',
                            showError: brandNameFormik.errors.brandName !== undefined,
                        }}
                        value={brandNameFormik.values.brandName}
                        onChange={(value) => brandNameFormik.setFieldValue('brandName', value)}
                    />
                </div>
                <div className={cn(styles.submitBrandNameWrapper)}>
                    <Button
                        label={'Add Brand'}
                        variant={'outline'}
                        labelColor={'--inventory-color'}
                        backgroundColor={'--inventory-color'}
                        type="submit"
                    />
                </div>
            </form>
        </div>
    );
};
