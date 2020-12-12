export const cssColors = {
    /* section colors */
    '--sellerspot-color': '#172B4D',
    '--sales-color': '#3f51b5',
    '--inventory-color': '#ff5722',
    '--cashregister-color': '#2196f3',

    /* mood colors */
    '--success-color': '#4caf50',
    '--success-accent-color': '#D9F7DA',
    '--warning-color': '#ffc107',
    '--warning-accent-color': '#FFFFE6',
    '--danger-color': '#f44336',
    '--danger-accent-color': '#ffdee3',
    '--info-color': '#2196F3',
    '--info-accent-color': '#CCEFFC',
    '--disabled-color': '#ebebe4',
    '--transparent-color': 'transparent',

    /* element colors */
    '--border-color': '#f2f2f2',
    '--border-darker-color': '#a0a0a0',
    '--border-accent-color': '#909090',
    '--shadow-color': 'rgba(0,0,0,0.15)',

    /* backgrounds */
    /* card" backgrounds */
    '--primary-background-color': '#ffffff',
    /* page background */
    '--secondary-background-color': '#f3f4f6',
    /* table header" background selected tab */
    '--tertiary-background-color': '#e6e6e6',
    /* used as overlay backgrounds */
    '--overlay-color': 'rgb(0, 0, 0, 0.5)',

    /* font colors */
    '--primary-font-color': '#000000',
    '--secondary-font-color': '#808080',
    '--tertiary-font-color': '#a0a0a0',
    '--light-font-color': '#ffffff',
};

export const cssVariables = {
    /* font-sizes */
    '--font-size-extra-large': '36px',
    '--font-size-master': '26px',
    '--font-size-master-sub': '24px',
    '--font-size-header': '20px',
    '--font-size-small-heading': '18px',
    '--font-size-default': '16px',
    '--font-size-secondary': '14px',
    '--font-size-tertiary': '12px',

    /* values */
    '--border-radius': '0.2rem',
    '--rounded-border-radius': '50px',
    '--transition-duration': '0.3s',
    '--input-field-height': '40px',
    '--small-input-field-height': '20px',
    '--shadow': '0px 0px 3px 0px var(--shadow-color)',

    /* z-index values */
    '--z-index-notify': '10',
    '--z-index-confirm-dialog': '6',
    '--z-index-slider-modal': '5',
    '--z-index-tab-bar': '4',
    '--z-index-dropdown': '3',
    '--z-index-table-header': '2',
};

// used to load css variables in ts object into the :root context
export function loadCSSValues(): void {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(cssVariables)) {
        root.style.setProperty(key, value);
    }
    for (const [key, value] of Object.entries(cssColors)) {
        root.style.setProperty(key, value);
    }
}

export type TMajorColors = 'success' | 'danger' | 'warning' | 'info';
