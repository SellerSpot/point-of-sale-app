import { cx } from '@emotion/css';
import {
    Button,
    Checkbox,
    Dropdown,
    HorizontalRule,
    InputField,
} from '@sellerspot/universal-components';
import { ICONS } from 'config/icons';
import { useFormik } from 'formik';
import { handleSliderClose } from 'layouts/Dashboard/components/Sliders/Sliders';
import lodash from 'lodash';
import React, { useEffect, useState } from 'react';
import { getAddProductStyles } from './addProduct.styles';
import {
    checkIfTaxItemIsSelected,
    fetchAddProductDropDownData,
    handleAddProductFormOnSubmit,
} from './addProduct.actions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import {
    addProductFormSchema,
    IAddProductDropDownValuesData,
    IAddProductFormSchema,
} from 'typings/components/product.types';
import { cssColors } from 'config/cssVariables';
import { IGetCategory } from 'typings/components/category.types';
import { IGetBrand } from 'typings/components/brand.types';
import { IGetStockUnit } from 'typings/components/stockUnit.types';

const formInitialValues: IAddProductFormSchema = {
    name: '',
    gtinNumber: '',
    category: null,
    brand: null,
    landingPrice: 0,
    profitPercent: 0,
    sellingPrice: 0,
    mrpPrice: 0,
    availableStock: 0,
    stockUnit: null,
    taxBracket: [],
};

export const AddProduct = (): JSX.Element => {
    const styles = getAddProductStyles();
    const [multiOptionValues, setMultiOptionValues] = useState<IAddProductDropDownValuesData>({
        categories: [],
        brands: [],
        stockUnits: [],
        taxBrackets: [],
    });
    const sliderState = useSelector((state: RootState) => state.sliderModal);

    const formFormik = useFormik({
        initialValues: formInitialValues,
        validationSchema: addProductFormSchema,
        onSubmit: handleAddProductFormOnSubmit,
    });

    useEffect(() => {
        (async () => {
            // fetching all dropDown data
            await fetchAddProductDropDownData(
                setMultiOptionValues,
                (category: IGetCategory, brand: IGetBrand, stockUnit: IGetStockUnit) => {
                    formFormik.setFieldValue('category', category);
                    formFormik.setFieldValue('brand', brand);
                    formFormik.setFieldValue('stockUnit', stockUnit);
                },
            );
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
                        options={multiOptionValues.categories.map((category, index) => {
                            return <p key={index}>{category.name}</p>;
                        })}
                        onSelect={(index) => {
                            formFormik.setFieldValue(
                                'category',
                                multiOptionValues.categories[index],
                            );
                        }}
                    />
                    <Dropdown
                        label={'Brand'}
                        options={multiOptionValues.brands.map((brand, index) => {
                            return <p key={index}>{brand.name}</p>;
                        })}
                        onSelect={(index) => {
                            formFormik.setFieldValue('brand', multiOptionValues.brands[index]);
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
                <div className={cx(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        name={'mrpPrice'}
                        type={'number'}
                        label={'MRP'}
                        prefix={<p>₹</p>}
                        placeHolder={'Eg. 251'}
                        error={{
                            errorMessage: formFormik.errors.mrpPrice ?? '',
                            showError:
                                !lodash.isUndefined(formFormik.errors.mrpPrice) &&
                                formFormik.touched.mrpPrice,
                        }}
                        value={formFormik.values.mrpPrice.toString()}
                        onBlur={formFormik.handleBlur}
                        onChange={formFormik.handleChange}
                    />
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
                                        }
                                    }
                                }}
                            />
                        );
                    })}
                </div>
            </div>
            <div className={styles.pageFooter}>
                <Button
                    type="submit"
                    status={formFormik.isSubmitting ? 'disabledLoading' : 'default'}
                    label={'Add Product'}
                    tabIndex={0}
                    style={{
                        backgroundColor: cssColors['--inventory-color'],
                        color: cssColors['--light-font-color'],
                    }}
                />
                <Button
                    type="button"
                    status={formFormik.isSubmitting ? 'disabledLoading' : 'default'}
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
