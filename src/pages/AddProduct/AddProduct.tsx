import React, { ReactElement } from 'react';
import { Button } from '../../components/Button/Button';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { HorizontalRule } from '../../components/HorizontalRule/HorizontalRule';
import { InputField } from '../../components/InputField/InputField';
import addProductStyles from './addProduct.module.css';

interface IAddProductProps {
    active: boolean;
}

export const AddProduct = (props: IAddProductProps): ReactElement => {
    const { active } = props;

    return (
        <div
            className={`${addProductStyles.addProductWrapper} ${
                active ? addProductStyles.addProductWrapperBackdrop : ''
            }`}
        >
            <div className={`${addProductStyles.sliderWrapper} ${active ? addProductStyles.sliderActive : ''}`}>
                <div className={addProductStyles.sliderHeader}>Add Product</div>
                <div className={addProductStyles.sliderBody}>
                    <div className={`${addProductStyles.formGroup}`}>
                        <InputField
                            type={'text'}
                            label={'Product Name'}
                            placeHolder={'Product Name'}
                            onChange={() => void 0}
                        />
                    </div>
                    <div className={`${addProductStyles.formGroup}`}>
                        <InputField
                            type={'text'}
                            label={'Product GTIN'}
                            placeHolder={'Product Code'}
                            onChange={() => void 0}
                        />
                    </div>
                    <div className={`${addProductStyles.formGroup} ${addProductStyles.formGroupSplitEqual}`}>
                        <Dropdown
                            label={'Product Category'}
                            options={['Category One', 'Category Two', 'Category Three']}
                            onSelect={() => {
                                // console.log(option);
                            }}
                        />
                        <Dropdown
                            label={'Product Brand'}
                            options={['Brand One', 'Brand Two', 'Brand Three']}
                            onSelect={() => {
                                // console.log(option);
                            }}
                        />
                    </div>
                    <HorizontalRule style={{ paddingTop: 10, paddingBottom: 30 }} />
                    <div className={`${addProductStyles.formGroup} ${addProductStyles.formGroupSplitEqual}`}>
                        <InputField
                            type={'number'}
                            label={'Cost Price'}
                            placeHolder={'Cost Price'}
                            onChange={() => void 0}
                        />
                        <InputField
                            type={'number'}
                            label={'Markup %'}
                            placeHolder={'Markup Percent'}
                            onChange={() => void 0}
                        />
                    </div>
                    <div className={`${addProductStyles.formGroup} ${addProductStyles.formGroupSplitEqual}`}>
                        <InputField
                            type={'number'}
                            label={'Selling Price'}
                            placeHolder={'Selling Price'}
                            onChange={() => void 0}
                        />
                    </div>
                    <HorizontalRule style={{ paddingTop: 10, paddingBottom: 30 }} />
                    <div className={`${addProductStyles.formGroup} ${addProductStyles.formGroupSplitEqual}`}>
                        <InputField
                            type={'number'}
                            label={'Stock Level'}
                            placeHolder={'Stock Level'}
                            onChange={() => void 0}
                        />
                        <InputField
                            type={'number'}
                            label={'Stock Unit'}
                            placeHolder={'Stock Unit'}
                            onChange={() => void 0}
                        />
                    </div>
                </div>
                <div className={addProductStyles.sliderFooter}>
                    <Button
                        type="button"
                        shape="rectangle"
                        label="Add Product"
                        variant="solid"
                        backgroundColor="--warning-color"
                        labelColor="--light-font-color"
                    />
                </div>
            </div>
        </div>
    );
};
