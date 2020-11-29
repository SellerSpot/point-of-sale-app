import React from 'react';
import '../styles/core.css';
import { Story, Meta } from '@storybook/react/types-6-0';
import { MetaCard, propsType } from '../components/MetaCard/MetaCard';
import { loadCSSValues } from '../config/cssVariables';

// used to load css variables in ts object into the :root context
loadCSSValues();

export default {
    title: 'Components',
    component: MetaCard,
} as Meta;

const Template: Story<propsType> = (args: propsType) => <MetaCard {...args} />;

export const MetaCards = Template.bind({});
MetaCards.args = {
    pageDescription: 'This is sample description',
    shortcuts: [
        {
            name: 'Quit App',
            keys: 'Alt+F4',
        },
        {
            name: 'Quit App',
            keys: 'Alt+F4',
        },
    ],
    primaryButton: {
        label: 'Sample Button',
        onClickCallback: () => {
            // eslint-disable-next-line no-console
            console.log('Pressed');
        },
        style: {
            color: 'var(--sales-color)',
        },
    },
} as propsType;
