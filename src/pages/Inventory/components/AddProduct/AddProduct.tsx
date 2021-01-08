import { cx } from '@emotion/css';
import { Dropdown, InputField } from '@sellerspot/universal-components';
import { ICONS } from 'config/icons';
import { useFormik } from 'formik';
import { handleSliderClose } from 'layouts/Dashboard/components/Sliders/Sliders';
import lodash from 'lodash';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { getAddProductStyles } from './addProduct.styles';
import { IGetCategory } from 'typings/components/category.types';
import { IGetBrand } from 'typings/components/brand.types';
import { IGetStockUnit } from 'typings/components/stockUnit.types';
import { IGetTaxBracket } from 'typings/components/taxBracket.types';
import { fetchAddProductDropDownData } from './addProduct.actions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const formSchema = Yup.object().shape({
    name: Yup.string().required('Product name is a required field'),
    gtinNumber: Yup.string(),
    category: Yup.string(),
    brand: Yup.string(),
    landingPrice: Yup.number().required('Landing price is a required field'),
    profitPercent: Yup.number(),
    sellingPrice: Yup.number().required('Selling price is a required field'),
    availableStock: Yup.number(),
    stockUnit: Yup.string(),
    taxBracket: Yup.array(),
});

const formInitialValues = {
    name: '',
    gtinNumber: '',
    category: '',
    brand: '',
    landingPrice: 0,
    profitPercent: 0,
    sellingPrice: 0,
    availableStock: 0,
    stockUnit: '',
    taxBracket: [''],
};

export interface IAddProductDropDownValues {
    category?: {
        options?: IGetCategory[];
        selectedIndex?: number;
    };
    brands?: {
        options?: IGetBrand[];
        selectedIndex?: number;
    };
    stockUnits?: {
        options?: IGetStockUnit[];
        selectedIndex?: number;
    };
    taxBrackets?: {
        options?: IGetTaxBracket[];
        selectedIndex?: number;
    };
}

export const AddProduct = (): JSX.Element => {
    const styles = getAddProductStyles();
    const [dropDownValues, setDropDownValues] = useState<IAddProductDropDownValues>({
        category: {
            options: [],
            selectedIndex: 0,
        },
        brands: {
            options: [],
            selectedIndex: 0,
        },
        stockUnits: {
            options: [],
            selectedIndex: 0,
        },
        taxBrackets: {
            options: [],
            selectedIndex: 0,
        },
    });
    const sliderState = useSelector((state: RootState) => state.sliderModal);

    const formFormik = useFormik({
        initialValues: formInitialValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log('Form Submitted');
        },
    });

    useEffect(() => {
        (async () => {
            // fetching all dropDown data
            await fetchAddProductDropDownData(setDropDownValues);
        }).call(null);
    }, [sliderState.addProductSlider.show === true]);

    return (
        <form onSubmit={formFormik.handleSubmit} className={styles.pageWrapper} noValidate>
            <div className={styles.pageHeader}>
                <div
                    className={styles.pageHeaderBackIcon}
                    onClick={() => handleSliderClose('addProductSlider')}
                >
                    <ICONS.leftCaretBack size={'35px'} />
                </div>
            </div>
            <div className={styles.pageTitleBar}>Add Product</div>
            <div className={styles.pageBody}>
                <div className={styles.formGroup}>
                    <InputField
                        name={'name'}
                        type={'text'}
                        label={'Product Name'}
                        placeHolder={'Eg. Wanda Paprika'}
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
                        name={'gtinNumber'}
                        type={'text'}
                        label={'GTIN Code'}
                        helperText={'Refers to the barcode for the product'}
                        placeHolder={'Eg. 0123456789'}
                        error={{
                            errorMessage: formFormik.errors.gtinNumber ?? '',
                            showError:
                                !lodash.isUndefined(formFormik.errors.gtinNumber) &&
                                formFormik.touched.gtinNumber,
                        }}
                        value={formFormik.values.gtinNumber}
                        onBlur={formFormik.handleBlur}
                        onChange={formFormik.handleChange}
                    />
                </div>
                <div className={cx(styles.formGroup, styles.formGroupSplitEqual)}>
                    <Dropdown
                        label={'Product Category'}
                        options={dropDownValues.category.options.map((category) => {
                            return <p key={category._id}>{category.name}</p>;
                        })}
                        onSelect={(index) => {
                            formFormik.setFieldValue(
                                'category',
                                dropDownValues.category.options[index]._id,
                            );
                            setDropDownValues(
                                lodash.merge<IAddProductDropDownValues, IAddProductDropDownValues>(
                                    dropDownValues,
                                    {
                                        category: {
                                            selectedIndex: index,
                                        },
                                    },
                                ),
                            );
                        }}
                        error={{
                            errorMessage: formFormik.errors.category ?? '',
                            showError:
                                !lodash.isUndefined(formFormik.errors.category) &&
                                formFormik.touched.category,
                        }}
                    />
                </div>
                {/*
                    <Dropdown
                        label={'Product Brand'}
                        options={
                            !lodash.isNull(brandDropdownValues.values)
                                ? brandDropdownValues.values.map((brand) => brand.name)
                                : []
                        }
                        onSelect={(index) => {
                            formFormik.setFieldValue(
                                'brand',
                                brandDropdownValues.values.find(
                                    (brand) =>
                                        brand.name === brandDropdownValues.values[index].name,
                                ).id,
                            );
                        }}
                        error={{
                            errorMessage: formFormik.errors.brand ?? '',
                            showError:
                                !lodash.isUndefined(formFormik.errors.brand) &&
                                formFormik.touched.gtinNumber,
                        }}
                    />
                </div> */}
            </div>
        </form>
    );
};
