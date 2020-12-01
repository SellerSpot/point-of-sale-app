export const cssColors = {
    /* section colors */
    '--sales-color': '#3f51b5',
    '--inventory-color': '#ff5722',
    '--cashregister-color': '#2196f3',

    /* mood colors */
    '--success-color': '#4caf50',
    '--warning-color': '#ffc107',
    '--danger-color': '#f44336',
    '--disabled-color': '#808080',

    /* element colors */
    '--border-color': '#f2f2f2',
    '--border-darker-color': '#a0a0a0',
    '--border-accent-color': '#909090',
    '--shadow-color': 'rgba(0,0,0,0.15)',

    /* backgrounds */
    /* card" backgrounds */
    '--primary-background-color': '#ffffff',
    /* page background, selected" tab */
    '--secondary-background-color': '#f5f5f5',
    /* table header" background */
    '--tertiary-background-color': '#e8e8e8',

    /* font colors */
    '--primary-font-color': '#000000',
    '--secondary-font-color': '#808080',
    '--tertiary-font-color': '#a0a0a0',
    '--light-font-color': '#ffffff',
};

export const cssVariables = {
    /* font-sizes */
    '--font-size-extra-large': '40px',
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
    '--shadow': '0px 0px 8px 0px var(--shadow-color)',
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
