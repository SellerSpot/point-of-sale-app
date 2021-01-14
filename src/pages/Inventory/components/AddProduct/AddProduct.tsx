import { cx } from '@emotion/css';
import { Checkbox, Dropdown, HorizontalRule, InputField } from '@sellerspot/universal-components';
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
import { checkIfTaxItemIsSelected, fetchAddProductDropDownData } from './addProduct.actions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { IAddProductDropDownValues, IFormInitialValues } from './addProduct.types';

const formSchema = Yup.object().shape({
    name: Yup.string().required('Product name is a required field'),
    gtinNumber: Yup.string(),
    category: Yup.object().shape({
        name: Yup.string(),
        _id: Yup.string(),
    }),
    brand: Yup.object().shape({
        name: Yup.string(),
        _id: Yup.string(),
    }),
    landingPrice: Yup.number().required('Landing price is a required field'),
    profitPercent: Yup.number(),
    sellingPrice: Yup.number().required('Selling price is a required field'),
    availableStock: Yup.number(),
    stockUnit: Yup.object().shape({
        name: Yup.string(),
        _id: Yup.string(),
    }),
    taxBracket: Yup.object().shape({
        name: Yup.string(),
        _id: Yup.string(),
    }),
});

const formInitialValues: IFormInitialValues = {
    name: '',
    gtinNumber: '',
    category: null,
    brand: null,
    landingPrice: 0,
    profitPercent: 0,
    sellingPrice: 0,
    availableStock: 0,
    stockUnit: null,
    taxBracket: [],
};

export const AddProduct = (): JSX.Element => {
    const styles = getAddProductStyles();
    const [multiOptionValues, setMultiOptionValues] = useState<IAddProductDropDownValues>({
        categories: [],
        brands: [],
        stockUnits: [],
        taxBrackets: [],
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
            await fetchAddProductDropDownData(setMultiOptionValues);
        }).call(null);
    }, [sliderState.addProductSlider.show]);

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
                        label={'Category'}
                        options={multiOptionValues.categories.map((category) => {
                            return <p key={category._id}>{category.name}</p>;
                        })}
                        onSelect={(index) => {
                            formFormik.setFieldValue(
                                'category',
                                multiOptionValues.categories[index]._id,
                            );
                        }}
                    />
                    <Dropdown
                        label={'Brand'}
                        options={multiOptionValues.brands.map((brand) => {
                            return <p key={brand._id}>{brand.name}</p>;
                        })}
                        onSelect={(index) => {
                            formFormik.setFieldValue('category', multiOptionValues.brands[index]);
                        }}
                    />
                </div>
                <HorizontalRule
                    ruleWidth={'75%'}
                    style={{
                        horizontalRuleWrapperStyle: {
                            paddingTop: 5,
                            paddingBottom: 20,
                        },
                    }}
                />
                <div className={cx(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        name={'landingPrice'}
                        type={'number'}
                        label={'Landing Price'}
                        placeHolder={'Landing Price'}
                        prefix={<p>₹</p>}
                        required={true}
                        value={formFormik.values.landingPrice?.toString()}
                        onBlur={formFormik.handleBlur}
                        onChange={formFormik.handleChange}
                        error={{
                            errorMessage: formFormik.errors.landingPrice ?? '',
                            showError:
                                !lodash.isUndefined(formFormik.errors.landingPrice) &&
                                formFormik.touched.landingPrice,
                        }}
                    />
                    <InputField
                        name={'profitPercent'}
                        type={'number'}
                        label={'Profit Percent'}
                        placeHolder={'Profit Percent'}
                        suffix={<p>%</p>}
                        value={formFormik.values.profitPercent?.toString()}
                        onBlur={formFormik.handleBlur}
                        onChange={formFormik.handleChange}
                        error={{
                            errorMessage: formFormik.errors.profitPercent ?? '',
                            showError:
                                !lodash.isUndefined(formFormik.errors.profitPercent) &&
                                formFormik.touched.profitPercent,
                        }}
                    />
                </div>
                <div className={styles.formGroup}>
                    <InputField
                        name={'sellingPrice'}
                        type={'number'}
                        label={'Selling Price'}
                        prefix={<p>₹</p>}
                        placeHolder={'Eg. 251'}
                        error={{
                            errorMessage: formFormik.errors.sellingPrice ?? '',
                            showError:
                                !lodash.isUndefined(formFormik.errors.sellingPrice) &&
                                formFormik.touched.sellingPrice,
                        }}
                        value={formFormik.values.sellingPrice.toString()}
                        onBlur={formFormik.handleBlur}
                        onChange={formFormik.handleChange}
                    />
                </div>
                <HorizontalRule
                    ruleWidth={'75%'}
                    style={{
                        horizontalRuleWrapperStyle: {
                            paddingTop: 5,
                            paddingBottom: 20,
                        },
                    }}
                />
                <div className={cx(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        type={'number'}
                        label={'Available Stock'}
                        placeHolder={'Available Stock'}
                        value={formFormik.values.availableStock?.toString()}
                        onChange={(event) =>
                            formFormik.setFieldValue('availableStock', event.target.value)
                        }
                        error={{
                            errorMessage: formFormik.errors.sellingPrice ?? '',
                            showError:
                                !lodash.isUndefined(formFormik.errors.sellingPrice) &&
                                formFormik.touched.sellingPrice,
                        }}
                    />
                    <Dropdown
                        label={'Stock Unit'}
                        options={multiOptionValues.stockUnits.map((stockUnit) => {
                            return <p key={stockUnit._id}>{stockUnit.name}</p>;
                        })}
                        onSelect={(index) => {
                            formFormik.setFieldValue(
                                'stockUnit',
                                multiOptionValues.stockUnits[index],
                            );
                        }}
                    />
                </div>
                <div className={cx(styles.formGroup)}>
                    {multiOptionValues.taxBrackets?.map((taxBracket, index) => {
                        return (
                            <Checkbox
                                key={index}
                                groupLabel={index === 0 ? 'Tax Bracket' : null}
                                label={taxBracket.name}
                                checked={checkIfTaxItemIsSelected(
                                    formFormik.values.taxBracket,
                                    taxBracket,
                                )}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        const taxBracketValues = formFormik.values.taxBracket;
                                        taxBracketValues.push(taxBracket);
                                        formFormik.setFieldValue('taxBracket', taxBracketValues);
                                    } else {
                                        const taxBracketValues = formFormik.values.taxBracket;
                                        // finding index of the taxBracket to remove and removing it
                                        for (let i = 0; i < taxBracketValues.length; i++) {
                                            if (taxBracketValues[i]._id === taxBracket._id) {
                                                taxBracketValues.splice(i, 1);
                                                formFormik.setFieldValue(
                                                    'taxBracket',
                                                    taxBracketValues,
                                                );

                                                break;
                                            }
                                            // console.log(taxBracketValues[i]._id, taxBracket._id);
                                        }
                                    }
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </form>
    );
};
