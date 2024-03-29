import classNames from 'classnames';
import { useFormik } from 'formik';
import { isNull, isUndefined, last } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productRequests } from 'requests';
import { SLIDERS, closeSliderModal } from 'store/models/sliderModal';
import { RootState, store } from 'store/store';
import { handleCloseSlider } from 'utilities/general';
import { showMessage } from 'utilities/notify';
import {
    Button,
    Checkbox,
    Dropdown,
    HorizontalRule,
    InputField,
    Spinner,
} from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import {
    checkIfTaxItemIsSelected,
    compileProductSpecialOptions,
    computeProfitPercentageAddProductPage,
    computeSellingPriceAddProductPage,
} from './addProduct.actions';
import styles from './addProduct.module.scss';
import {
    AddProductFormSchema,
    IAddProductFormSchema,
    IProductMetaDataOptions,
} from './addProduct.types';

/**
 * * holds the initial values for the form
 */
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
    taxBrackets: [],
};

export const AddProduct = (): JSX.Element => {
    //# VALUE HOOKS
    // holds the available metadata for a product
    const [productMetaDataOptions, setProductMetaDataOptions] = useState<IProductMetaDataOptions>({
        brands: [],
        categories: [],
        stockUnits: [],
        taxBrackets: [],
    });
    // state to manage the focus state of the first inputField
    const [focusInputField, setFocusInputField] = useState(false);
    // getting sliderState to listen to when the slider is invoked to autopopulate if needed
    const sliderState = useSelector((state: RootState) => state.sliderModal);
    // state to hold the loading state of the addProducts page
    const [pageLoading, setPageLoading] = useState(true);
    // dispatch actions to store
    const dispatch = useDispatch();

    //# CRITICAL FUNCTIONS

    // * getting formik instance to handle form operations
    const formFormik = useFormik({
        initialValues: formInitialValues,
        validationSchema: AddProductFormSchema,
        onSubmit: async (values: IAddProductFormSchema) => {
            formFormik.setSubmitting(true);
            console.log('Started Submit');
            // checking if it is an update query
            if (!isNull(sliderState.sliders.addProductSlider.autoFillData)) {
                const response = await productRequests.updateProduct(values);
                if (response.status) {
                    showMessage('Product Updated!', 'success');
                    dispatch(
                        closeSliderModal({
                            sliderName: SLIDERS.addProductSlider,
                        }),
                    );
                } else {
                    response.error.map((error) => {
                        formFormik.setFieldError(error.name, error.message);
                    });
                }
            } else {
                const response = await productRequests.createProduct(values);
                if (response.status) {
                    showMessage('Product added to database!', 'success');
                    formFormik.resetForm();
                    setFocusInputField(true);
                } else {
                    response.error.map((error) => {
                        formFormik.setFieldError(error.name, error.message);
                    });
                }
            }

            formFormik.setSubmitting(false);
        },
    });

    //# HOOK FUNCTIONS

    // * to manage focus for inputFields and autofill data
    useEffect(() => {
        if (sliderState.openSliders.includes(SLIDERS.addProductSlider)) {
            populateProductSpecialOptions();
            setFocusInputField(true);
            // checking if any autofill data is present
            if (!isNull(sliderState.sliders.addProductSlider.autoFillData)) {
                const autoFillData = sliderState.sliders.addProductSlider.autoFillData;
                // pushing data to formik state
                formFormik.setValues(autoFillData as IAddProductFormSchema);
            }
        } else {
            formFormik.resetForm();
        }
    }, [sliderState.openSliders]);

    // * to fetch all available special options for a product and update in state
    const populateProductSpecialOptions = async () => {
        // setting page loading
        setPageLoading(true);
        // fetching all special options from server
        const specialProductOptions = await compileProductSpecialOptions();
        setProductMetaDataOptions(specialProductOptions);
        // compiling default values for special options
        const defaultCategory: IAddProductFormSchema['category'] =
            specialProductOptions.categories.length > 0
                ? specialProductOptions.categories[0]
                : null;
        const defaultBrand: IAddProductFormSchema['brand'] =
            specialProductOptions.brands.length > 0 ? specialProductOptions.brands[0] : null;
        const defaultStockUnit: IAddProductFormSchema['stockUnit'] =
            specialProductOptions.stockUnits.length > 0
                ? specialProductOptions.stockUnits[0]
                : null;
        const defaultTaxBrackets: IAddProductFormSchema['taxBrackets'] = [];
        // setting values to form store
        formFormik.setFieldValue('brand' as keyof IAddProductFormSchema, defaultBrand);
        formFormik.setFieldValue('category' as keyof IAddProductFormSchema, defaultCategory);
        formFormik.setFieldValue('stockUnit' as keyof IAddProductFormSchema, defaultStockUnit);
        formFormik.setFieldValue('taxBrackets' as keyof IAddProductFormSchema, defaultTaxBrackets);
        // setting page loading
        setPageLoading(false);
    };

    // to handle slider closing operations
    useEffect(() => {
        if (sliderState.callBackStateTrack.includes(SLIDERS.addProductSlider)) {
            // getting the topmost slider
            const topMostSlider = last(sliderState.openSliders);
            // only executing action if the top most slider is the current slider
            if (topMostSlider === SLIDERS.addProductSlider) {
                handleCloseSlider({
                    callBackStateTrack: sliderState.callBackStateTrack,
                    sliderState,
                    topMostSlider,
                });
            }
        }
    }, [sliderState.callBackStateTrack]);

    return (
        <form onSubmit={formFormik.handleSubmit} className={styles.pageWrapper} noValidate>
            {pageLoading ? (
                <div className={styles.loadingOverlay}>
                    <Spinner size={'medium'} />
                </div>
            ) : null}
            <div className={styles.pageTitleBar}>Add Product</div>
            <div className={styles.pageBody}>
                <div className={styles.formGroup}>
                    <InputField
                        focus={focusInputField}
                        setFocus={setFocusInputField}
                        name={'name' as pointOfSaleTypes.productResponseTypes.fieldNames}
                        type={'text'}
                        label={'Product Name'}
                        placeHolder={'Eg. Wanda Paprika'}
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
                <div className={styles.formGroup}>
                    <InputField
                        name={'gtinNumber' as pointOfSaleTypes.productResponseTypes.fieldNames}
                        type={'text'}
                        label={'GTIN Number'}
                        helperText={'Refers to the barcode for the product'}
                        placeHolder={'Eg. 0123456789'}
                        error={{
                            errorMessage: formFormik.errors.gtinNumber ?? '',
                            showError:
                                !isUndefined(formFormik.errors.gtinNumber) &&
                                formFormik.touched.gtinNumber,
                        }}
                        value={formFormik.values.gtinNumber}
                        onBlur={formFormik.handleBlur}
                        onChange={formFormik.handleChange}
                    />
                </div>
                <div className={classNames(styles.formGroup, styles.formGroupSplitEqual)}>
                    <Dropdown
                        label={'Category'}
                        options={productMetaDataOptions.categories.map((category, index) => {
                            return <p key={index}>{category.name}</p>;
                        })}
                        onSelect={(index) => {
                            formFormik.setFieldValue(
                                'category' as keyof IAddProductFormSchema,
                                productMetaDataOptions.categories[index]._id,
                            );
                        }}
                    />
                    <Dropdown
                        label={'Product'}
                        options={productMetaDataOptions.brands.map((brand, index) => {
                            return <p key={index}>{brand.name}</p>;
                        })}
                        onSelect={(index) => {
                            formFormik.setFieldValue(
                                'brand' as keyof IAddProductFormSchema,
                                productMetaDataOptions.brands[index],
                            );
                        }}
                    />
                </div>
                <HorizontalRule
                    ruleWidth={'75%'}
                    style={{
                        horizontalRuleWrapperStyle: {
                            paddingTop: 0,
                            paddingBottom: 20,
                        },
                    }}
                />
                <div className={classNames(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        name={'landingPrice'}
                        type={'number'}
                        label={'Landing Price'}
                        placeHolder={'Landing Price'}
                        prefix={<p>₹</p>}
                        required={true}
                        value={formFormik.values.landingPrice?.toString()}
                        onBlur={formFormik.handleBlur}
                        onChange={(event) => {
                            formFormik.handleChange(event);
                            // checking for landing price to automate selling price computation
                            if (!isNull(formFormik.values.profitPercent)) {
                                formFormik.setFieldValue(
                                    'sellingPrice',
                                    computeSellingPriceAddProductPage({
                                        landingPrice: parseInt(event.target.value),
                                        profitPercentage: formFormik.values.profitPercent,
                                    }),
                                );
                            }
                        }}
                        error={{
                            errorMessage: formFormik.errors.landingPrice ?? '',
                            showError:
                                !isUndefined(formFormik.errors.landingPrice) &&
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
                        onChange={(event) => {
                            formFormik.handleChange(event);
                            // checking for landing price to automate selling price computation
                            if (!isNull(formFormik.values.landingPrice)) {
                                formFormik.setFieldValue(
                                    'sellingPrice',
                                    computeSellingPriceAddProductPage({
                                        landingPrice: formFormik.values.landingPrice,
                                        profitPercentage: parseInt(event.target.value),
                                    }),
                                );
                            }
                        }}
                        error={{
                            errorMessage: formFormik.errors.profitPercent ?? '',
                            showError:
                                !isUndefined(formFormik.errors.profitPercent) &&
                                formFormik.touched.profitPercent,
                        }}
                    />
                </div>
                <div className={classNames(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        name={'mrpPrice'}
                        type={'number'}
                        label={'MRP'}
                        prefix={<p>₹</p>}
                        placeHolder={'Eg. 251'}
                        error={{
                            errorMessage: formFormik.errors.mrpPrice ?? '',
                            showError:
                                !isUndefined(formFormik.errors.mrpPrice) &&
                                formFormik.touched.mrpPrice,
                        }}
                        value={formFormik.values.mrpPrice?.toString()}
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
                                !isUndefined(formFormik.errors.sellingPrice) &&
                                formFormik.touched.sellingPrice,
                        }}
                        value={formFormik.values.sellingPrice?.toString()}
                        onBlur={formFormik.handleBlur}
                        onChange={(event) => {
                            formFormik.handleChange(event);
                            // checking for landing price to automate selling price computation
                            if (formFormik.values.landingPrice !== 0) {
                                formFormik.setFieldValue(
                                    'profitPercent',
                                    computeProfitPercentageAddProductPage({
                                        landingPrice: formFormik.values.landingPrice,
                                        sellingPrice: parseInt(event.target.value),
                                    }),
                                );
                            }
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
                <div className={classNames(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        type={'number'}
                        label={'Available Stock'}
                        placeHolder={'Available Stock'}
                        value={formFormik.values.availableStock?.toString()}
                        onChange={(event) =>
                            formFormik.setFieldValue(
                                'availableStock' as keyof IAddProductFormSchema,
                                event.target.value,
                            )
                        }
                        error={{
                            errorMessage: formFormik.errors.availableStock ?? '',
                            showError:
                                !isUndefined(formFormik.errors.availableStock) &&
                                formFormik.touched.availableStock,
                        }}
                    />
                    <Dropdown
                        label={'Stock Unit'}
                        options={productMetaDataOptions.stockUnits.map((stockUnit) => {
                            return <p key={stockUnit._id}>{stockUnit.name}</p>;
                        })}
                        onSelect={(index) => {
                            formFormik.setFieldValue(
                                'stockUnit' as keyof IAddProductFormSchema,
                                productMetaDataOptions.stockUnits[index],
                            );
                        }}
                    />
                </div>
                <div className={classNames(styles.formGroup)}>
                    {productMetaDataOptions.taxBrackets?.map((taxBracket, index) => {
                        return (
                            <Checkbox
                                key={index}
                                groupLabel={index === 0 ? 'Tax Bracket' : null}
                                label={taxBracket.name}
                                checked={checkIfTaxItemIsSelected(
                                    formFormik.values.taxBrackets,
                                    taxBracket,
                                )}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        const taxBracketValues = formFormik.values.taxBrackets;
                                        taxBracketValues.push(taxBracket);
                                        formFormik.setFieldValue(
                                            'taxBrackets' as keyof IAddProductFormSchema,
                                            taxBracketValues,
                                        );
                                    } else {
                                        const taxBracketValues = formFormik.values.taxBrackets;
                                        // finding index of the taxBracket to remove and removing it
                                        for (let i = 0; i < taxBracketValues.length; i++) {
                                            if (taxBracketValues[i]._id === taxBracket._id) {
                                                taxBracketValues.splice(i, 1);
                                                formFormik.setFieldValue(
                                                    'taxBrackets' as keyof IAddProductFormSchema,
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
                    onClick={(_) => {
                        console.log('Button Clicked');
                        formFormik.submitForm();
                        console.log(formFormik.errors);
                    }}
                    status={formFormik.isSubmitting ? 'disabledLoading' : 'default'}
                    label={
                        !isNull(sliderState.sliders.addProductSlider.autoFillData)
                            ? 'Update Product'
                            : 'Add Product'
                    }
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
