import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HorizontalRule } from '@sellerspot/universal-components';
import { ROUTES } from 'config/routes';
import { ICONS } from 'config/icons';
import styles from './leftNav.module.scss';
import commonStyles from '../../../../styles/common.module.scss';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'store/models/core';
interface INavItem {
    colorClass: string;
    Icon: React.ComponentType;
    title: string;
    active: boolean;
    route: string;
    activeRoutes: string[];
    onClick?: () => void;
    pushToBottom?: boolean;
}

const NavItem = ({
    Icon,
    colorClass,
    onClick,
    title,
    pushToBottom,
}: Omit<INavItem, 'activeRoutes'>): JSX.Element => {
    return (
        <div
            className={cn(styles.navItem, { [styles.navItemPushToBottom]: pushToBottom })}
            onClick={onClick}
        >
            <div className={cn(styles.navIcon, colorClass)}>
                <Icon />
            </div>
            <div className={cn(styles.navTitle, colorClass)}>{title}</div>
        </div>
    );
};

export const LeftNav = (): JSX.Element => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [currentNavRoute, setCurrentNavRoute] = useState(history.location.pathname);
    history.listen((location) => {
        setCurrentNavRoute(location.pathname);
    });

    const navItem: Omit<INavItem, 'active'>[] = [
        {
            Icon: ICONS.saleLeftNavItem,
            colorClass: commonStyles.salesColor,
            title: 'sales',
            route: ROUTES.SALES,
            activeRoutes: [ROUTES.SALES],
        },
        {
            Icon: ICONS.inventoryLeftNavItem,
            colorClass: commonStyles.inventoryColor,
            title: 'inventory',
            route: ROUTES.INVENTORY,
            activeRoutes: [
                ROUTES.INVENTORY,
                ROUTES.INVENTORY_BRANDS,
                ROUTES.INVENTORY_CATEGORIES,
                ROUTES.INVENTORY_PRODUCTS,
                ROUTES.INVENTORY_TAX_BRACKETS,
                ROUTES.INVENTORY_STOCK_UNITS,
            ],
        },
        {
            Icon: ICONS.billLeftNavItem,
            colorClass: commonStyles.billingColor,
            title: 'Billing Setup',
            route: ROUTES.BILLING_SETUP,
            activeRoutes: [ROUTES.BILLING_SETUP],
        },
        {
            Icon: ICONS.logout,
            colorClass: commonStyles.defaultColor,
            title: 'Logout',
            route: null,
            activeRoutes: [],
            onClick: () => {
                dispatch(logoutUser());
            },
            pushToBottom: true,
        },
    ];

    return (
        <div className={styles.leftNavWrapper}>
            <div className={styles.contentWrapper}>
                <div className={styles.storeNameHolder}>
                    <ICONS.storeLeftNavHeader size={'40px'} />
                    <div>
                        {'Store Name'}
                        <div className={styles.storeNameHolderSubtitle}>{'Hi, Olivia Katz'}</div>
                    </div>
                </div>
                <HorizontalRule
                    ruleWidth="100%"
                    style={{
                        horizontalRuleWrapperStyle: {
                            paddingBottom: 30,
                            paddingLeft: 0,
                            paddingRight: 0,
                            paddingTop: 0,
                        },
                    }}
                />
                <div className={styles.navSubHeading}>{'OPERATIONS'}</div>
                {navItem.map((item, key) => {
                    const isActive = item.activeRoutes.includes(currentNavRoute);
                    return (
                        <NavItem
                            key={key}
                            Icon={item.Icon}
                            colorClass={isActive ? item.colorClass : commonStyles.defaultColor}
                            onClick={item.onClick ?? (() => history.push(item.route))}
                            title={item.title}
                            route={item.route}
                            active={isActive}
                            pushToBottom={item?.pushToBottom}
                        />
                    );
                })}
            </div>
        </div>
    );
};
