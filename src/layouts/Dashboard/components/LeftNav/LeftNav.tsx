import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { cssColors } from 'config/cssVariables';
import { HorizontalRule } from '@sellerspot/universal-components';
import { ROUTES } from 'config/routes';
import { getLeftNavStyles } from './leftnav.styles';
import { ICONS } from 'config/icons';

interface INavItem {
    color: string;
    Icon: React.ComponentType;
    title: string;
    active: boolean;
    route: string;
    activeRoutes: string[];
    onClick: () => void;
}

const NavItem = ({ Icon, color, onClick, title }: Omit<INavItem, 'activeRoutes'>): JSX.Element => {
    const styles = getLeftNavStyles();

    return (
        <div
            className={styles.navItem}
            style={{
                color,
            }}
            onClick={onClick}
        >
            <div className={styles.navIcon}>
                <Icon />
            </div>
            <div className={styles.navTitle}>{title}</div>
        </div>
    );
};

export const LeftNav = (): JSX.Element => {
    const history = useHistory();
    const [currentNavRoute, setCurrentNavRoute] = useState(history.location.pathname);
    history.listen((location) => {
        setCurrentNavRoute(location.pathname);
    });

    const navItem: Omit<INavItem, 'active' | 'onClick'>[] = [
        {
            Icon: ICONS.saleLeftNavItem,
            color: cssColors['--sales-color'],
            title: 'sales',
            route: ROUTES.SALES,
            activeRoutes: [ROUTES.SALES],
        },
        {
            Icon: ICONS.inventoryLeftNavItem,
            color: cssColors['--inventory-color'],
            title: 'inventory',
            route: ROUTES.INVENTORY,
            activeRoutes: [
                ROUTES.INVENTORY,
                ROUTES.INVENTORY_BRANDS,
                ROUTES.INVENTORY_CATEGORIES,
                ROUTES.INVENTORY_PRODUCTS,
                ROUTES.INVENTORY_TAX_BRACKETS,
            ],
        },
        {
            Icon: ICONS.billLeftNavItem,
            color: cssColors['--cashregister-color'],
            title: 'Billing Setup',
            route: ROUTES.BILLING_SETUP,
            activeRoutes: [ROUTES.BILLING_SETUP],
        },
    ];

    const styles = getLeftNavStyles();
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
                            color={isActive ? item.color : cssColors['--tertiary-font-color']}
                            onClick={() => history.push(item.route)}
                            title={item.title}
                            route={item.route}
                            active={isActive}
                        />
                    );
                })}
            </div>
        </div>
    );
};
