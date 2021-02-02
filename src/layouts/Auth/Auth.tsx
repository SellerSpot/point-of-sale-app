import React, { ReactElement } from 'react';
import { SignIn } from 'pages/SignIn/SignIn';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { Forgot } from 'pages/Forgot/Forgot';
import { LogoImage, PromotionImage } from 'images/images';
import styles from './auth.module.scss';

export const Auth = (): ReactElement => {
    return (
        <div className={styles.authWrapper}>
            <div className={styles.promotionHolder}>
                {/* need to split this into new component */}
                <img className={styles.promotionImage} src={PromotionImage} alt="Promotion" />
                <div className={styles.logoHolder}>
                    <img className={styles.logoImage} src={LogoImage} alt="logo" />
                    <div className={styles.logoTitle}>
                        SellerSpot <br /> Point of Sale
                    </div>
                </div>
            </div>
            <div className={styles.mainContentHolder}>
                <Switch>
                    <Route path={ROUTES.AUTH_SIGN_IN}>
                        <SignIn />
                    </Route>
                    <Route path={ROUTES.AUTH_FORGOT}>
                        <Forgot />
                    </Route>
                    <Route>
                        <Redirect to={ROUTES.AUTH_SIGN_IN} />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};
