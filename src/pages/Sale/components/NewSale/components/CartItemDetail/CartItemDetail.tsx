import { ITabBarProps, TabBar } from 'components/TabBar/TabBar';
import { last } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { newSaleSelector } from 'store/models/newSale';
import { SLIDERS, sliderModalSelector } from 'store/models/sliderModal';
import { handleCloseSlider } from 'utilities/general';
import { INewSaleCart } from '../../newSale.types';
import styles from './cartItemDetail.module.scss';
import { getDetailedCalculations } from './cartItemDetails.actions';

export const CartItemDetail = (props: { cartData: INewSaleCart }): JSX.Element => {
    // getting slider state from redux store
    const sliderState = useSelector(sliderModalSelector);
    // state used to manage the tab selected
    const [selectedTab, setSelectedTab] = useState(0);
    // holds the rowIndex of cartItem selected by the user
    const [userSelectedRowIndex, setUserSelectedRowIndex] = useState(-1);

    // listening to the sliderModal store to fetch the row index user has selected
    useEffect(() => {
        // casting the autofill data
        const autoFillData = sliderState.sliders.itemDetailSlider.autoFillData as {
            cartItemSelectedRowIndex: number;
        };
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

    return props.cartData.productCartInformation.length > 0 ? (
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
                {selectedTab === 0 ? getDetailedCalculations(props.cartData, 0) : <div></div>}
            </div>
        </div>
    ) : null;
};
