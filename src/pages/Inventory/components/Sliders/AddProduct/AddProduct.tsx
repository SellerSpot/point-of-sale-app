import React, { ReactElement } from 'react';
import { Button } from '../../../../../components/Button/Button';
import { Dropdown } from '../../../../../components/Dropdown/Dropdown';
import { HorizontalRule } from '../../../../../components/HorizontalRule/HorizontalRule';
import { InputField } from '../../../../../components/InputField/InputField';
import styles from './addproduct.module.css';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { toggleSliderModal } from '../../../../../store/models/sliderModal';

export const AddProduct = (): ReactElement => {
    const dispatch = useDispatch();
    return (
        <div className={cn(styles.addProductWrapper)}>
            <div className={styles.addProductHeader}>Add Product</div>
            <div className={styles.addProductBody}>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Product Name'}
                        placeHolder={'Product Name'}
                        onChange={() => void 0}
                    />
                </div>
                <div className={cn(styles.formGroup)}>
                    <InputField
                        type={'text'}
                        label={'Product GTIN'}
                        placeHolder={'Product Code'}
                        onChange={() => void 0}
                    />
                </div>
                <div className={cn(styles.formGroup, styles.formGroupSplitEqual)}>
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
                <div className={cn(styles.formGroup, styles.formGroupSplitEqual)}>
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
                <div className={cn(styles.formGroup, styles.formGroupSplitEqual)}>
                    <InputField
                        type={'number'}
                        label={'Selling Price'}
                        placeHolder={'Selling Price'}
                        onChange={() => void 0}
                    />
                </div>
                <HorizontalRule style={{ paddingTop: 10, paddingBottom: 30 }} />
                <div className={cn(styles.formGroup, styles.formGroupSplitEqual)}>
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
            <div className={styles.addProductFooter}>
                <Button
                    type="button"
                    shape="rectangle"
                    label="Cancel"
                    variant="solid"
                    backgroundColor="--danger-color"
                    labelColor="--light-font-color"
                    style={{ marginRight: 'auto' }}
                    onClick={() => dispatch(toggleSliderModal({ sliderName: 'addProductSlider', active: false }))}
                />
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
    );
};
