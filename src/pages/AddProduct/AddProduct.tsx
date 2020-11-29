import React, { ReactElement } from 'react';
import { Button } from '../../components/Button/Button';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { HorizontalRule } from '../../components/HorizontalRule/HorizontalRule';
import { TextField } from '../../components/InputField/InputField';
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
                        <TextField
                            inputType={'text'}
                            label={'Product Name'}
                            placeHolder={'Product Name'}
                            fullWidth={true}
                        />
                    </div>
                    <div className={`${addProductStyles.formGroup}`}>
                        <TextField
                            inputType={'text'}
                            label={'Product GTIN'}
                            placeHolder={'Product Code'}
                            fullWidth={true}
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
                        <TextField
                            inputType={'number'}
                            label={'Cost Price'}
                            placeHolder={'Cost Price'}
                            fullWidth={true}
                        />
                        <TextField
                            inputType={'number'}
                            label={'Markup %'}
                            placeHolder={'Markup Percent'}
                            fullWidth={true}
                        />
                    </div>
                    <div className={`${addProductStyles.formGroup} ${addProductStyles.formGroupSplitEqual}`}>
                        <TextField
                            inputType={'number'}
                            label={'Selling Price'}
                            placeHolder={'Selling Price'}
                            fullWidth={true}
                        />
                    </div>
                    <HorizontalRule style={{ paddingTop: 10, paddingBottom: 30 }} />
                    <div className={`${addProductStyles.formGroup} ${addProductStyles.formGroupSplitEqual}`}>
                        <TextField
                            inputType={'number'}
                            label={'Stock Level'}
                            placeHolder={'Stock Level'}
                            fullWidth={true}
                        />
                        <TextField
                            inputType={'number'}
                            label={'Stock Unit'}
                            placeHolder={'Stock Unit'}
                            fullWidth={true}
                        />
                    </div>
                </div>
                <div className={addProductStyles.sliderFooter}>
                    <Button
                        type={'solid'}
                        shape={'default'}
                        label={'Add Product'}
                        variant={'warning'}
                        style={{ backgroundColor: 'var(--inventory-color)', color: 'var(--light-font-color)' }}
                    />
                </div>
            </div>
        </div>
    );
};
