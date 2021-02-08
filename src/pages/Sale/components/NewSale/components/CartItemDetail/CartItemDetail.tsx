import { ITabBarProps, TabBar } from 'components/TabBar/TabBar';
import { parse } from 'dotenv/types';
import { last } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { newSaleSelector } from 'store/models/newSale';
import { SLIDERS, sliderModalSelector } from 'store/models/sliderModal';
import { xPercentOfY } from 'utilities/businessCalculations';
import { handleCloseSlider } from 'utilities/general';
import { INewSaleCart } from '../../newSale.types';
import styles from './cartItemDetail.module.scss';
import { getDetailedCalculations } from './cartItemDetails.actions';

export interface IComputedData {
    itemSubTotalBeforeDiscounts: number;
    itemDiscount: number;
    totalDiscount: number;
    itemSubTotalAfterDiscounts: number;
    taxes: {
        taxBracketName: string;
        taxPercent: number;
        // computed tax amount for the current item
        taxForItem: number;
    }[];
    // total tax for single instance of the item
    taxSum: number;
    totalTax: number;
    itemTotal: number;
    grandTotal: number;
}

const computedDataInitialState: IComputedData = {
    grandTotal: 0,
    itemDiscount: 0,
    itemSubTotalAfterDiscounts: 0,
    itemSubTotalBeforeDiscounts: 0,
    itemTotal: 0,
    taxes: [],
    totalDiscount: 0,
    totalTax: 0,
    taxSum: 0,
};

export const CartItemDetail = (props: { cartData: INewSaleCart }): JSX.Element => {
    // getting slider state from redux store
    const sliderState = useSelector(sliderModalSelector);
    // state used to manage the tab selected
    const [selectedTab, setSelectedTab] = useState(0);
    // holds the rowIndex of cartItem selected by the user
    const [userSelectedRowIndex, setUserSelectedRowIndex] = useState(-1);
    // state to hold all the computed values used in the itemDetail page
    const [computedData, setComputedData] = useState<IComputedData>(computedDataInitialState);

    // used to compute the values for the itemDetails page
    const computeValues = (rowIndex: number) => {
        // getting current instance of cart item
        const cartItem = props.cartData.productCartInformation[rowIndex];
        const computedDataValues: IComputedData = computedDataInitialState;
        computedDataValues.itemSubTotalBeforeDiscounts = cartItem.itemPrice * cartItem.itemQuantity;
        computedDataValues.itemDiscount = xPercentOfY({
            x: cartItem.itemDiscountPercent,
            y: cartItem.itemPrice,
        });
        computedDataValues.totalDiscount = computedDataValues.itemDiscount;
        computedDataValues.itemSubTotalAfterDiscounts =
            computedDataValues.itemSubTotalBeforeDiscounts - computedDataValues.totalDiscount;
        computedDataValues.taxes = [];
        // adding tax informaiton
        for (let i = 0; i < props.cartData.products[rowIndex].taxBracket.length; i++) {
            const taxForItem = xPercentOfY({
                x: parseInt(props.cartData.products[rowIndex].taxBracket[i].taxPercent),
                y: computedDataValues.itemSubTotalAfterDiscounts,
            });
            computedDataValues.taxes.push({
                taxBracketName: props.cartData.products[rowIndex].taxBracket[i].name,
                taxPercent: parseInt(props.cartData.products[rowIndex].taxBracket[i].taxPercent),
                taxForItem,
            });
            computedDataValues.taxSum += taxForItem;
        }
        console.log(computedDataValues.taxes.length);

        // multipying total tax by quantity
        computedDataValues.totalTax = computedDataValues.taxSum * cartItem.itemQuantity;
        computedDataValues.itemTotal =
            computedDataValues.itemSubTotalAfterDiscounts + computedDataValues.totalTax;
        computedDataValues.grandTotal = computedDataValues.itemTotal;
        // setting computed data
        setComputedData(computedDataValues);
    };

    // listening to the sliderModal store to fetch the row index user has selected
    useEffect(() => {
        // casting the autofill data
        const autoFillData = sliderState.sliders.itemDetailSlider.autoFillData as {
            cartItemSelectedRowIndex: number;
        };
        // computing values if a valid rowIndex is mentioned
        if (autoFillData.cartItemSelectedRowIndex >= 0) {
            computeValues(autoFillData.cartItemSelectedRowIndex);
        } else {
            setComputedData(computedDataInitialState);
        }
        setUserSelectedRowIndex(autoFillData.cartItemSelectedRowIndex);
    }, [sliderState.sliders.itemDetailSlider.autoFillData]);

    //* used to handle the closing operations of the sliderModel
    useEffect(() => {
        if (sliderState.callBackStateTrack.includes(SLIDERS.itemDetailSlider)) {
            // getting the topmost slider
            const topMostSlider = last(sliderState.openSliders);
            // only executing action if the top most slider is the current slider
            if (topMostSlider === SLIDERS.itemDetailSlider) {
                handleCloseSlider({
                    callBackStateTrack: sliderState.callBackStateTrack,
                    sliderState,
                    topMostSlider,
                });
            }
        }
    }, [sliderState.callBackStateTrack]);

    return userSelectedRowIndex >= 0 ? (
        <div className={styles.pageWrapper}>
            <TabBar
                tabs={[
                    {
                        name: 'Detailed Calculations',
                    },
                    {
                        name: 'Item Details',
                    },
                ]}
                selectedIndex={selectedTab}
                onSelect={(selectedIndex) => setSelectedTab(selectedIndex)}
            />
            <div>
                {selectedTab === 0 ? (
                    getDetailedCalculations(props.cartData, userSelectedRowIndex, computedData)
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    ) : null;
};
