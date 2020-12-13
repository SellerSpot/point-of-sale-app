import React, { useState } from 'react';
import leftNavStyles from './leftnav.module.css';
import { FaBoxOpen, FaStore, IoMdCart, RiBillLine } from 'react-icons/all';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../../../config/routes';
import { cssColors } from '../../../../config/cssVariables';
import { HorizontalRule } from '../../../../components/HorizontalRule/HorizontalRule';

interface INavItem {
    color: string;
    Icon: React.ComponentType;
    title: string;
    active: boolean;
    route: string;
    activeRoutes: string[];
    onClick: () => void;
}

const NavItem = ({ Icon, color, onClick, title, active }: Omit<INavItem, 'activeRoutes'>): JSX.Element => {
    return (
        <div
            className={`${leftNavStyles.navItem} ${active ? leftNavStyles.navItemActive : ''}`}
            style={{
                color,
            }}
            onClick={onClick}
        >
            <div className={leftNavStyles.navIcon}>
                <Icon />
            </div>
            <div className={leftNavStyles.navTitle}>{title}</div>
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
            Icon: IoMdCart,
            color: cssColors['--sales-color'],
            title: 'sales',
            route: ROUTES.SALES,
            activeRoutes: [ROUTES.SALES],
        },
        {
            Icon: FaBoxOpen,
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
            Icon: RiBillLine,
            color: cssColors['--cashregister-color'],
            title: 'Billing Setup',
            route: ROUTES.BILLING_SETUP,
            activeRoutes: [ROUTES.BILLING_SETUP],
        },
        // {
        //     Icon: FaCashRegister,
        //     color: cssColors['--cashregister-color'],
        //     title: 'cash register',
        //     route: ROUTES.CASH_REGISTER,
        // },
    ];
    return (
        <div className={leftNavStyles.leftNavWrapper}>
            <div className={leftNavStyles.contentWrapper}>
                <div className={leftNavStyles.storeNameHolder}>
                    <FaStore size={'40px'} />
                    <div>
                        {'Store Name'}
                        <div className={leftNavStyles.storeNameHolderSubtitle}>{'Hi, Olivia Katz'}</div>
                    </div>
                </div>
                <HorizontalRule
                    ruleWidth="100%"
                    style={{ paddingBottom: 30, paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}
                />
                <div className={leftNavStyles.navSubHeading}>{'OPERATIONS'}</div>
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
