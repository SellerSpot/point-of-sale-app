import React from 'react';
import '../styles/core.css';
import { Story, Meta } from '@storybook/react/types-6-0';
import { LoadingSpinner, PropsType } from '../components/LoadingSpinner/LoadingSpinner';
import { loadCSSValues } from '../config/cssVariables';

// used to load css variables in ts object into the :root context
loadCSSValues();

export default {
    title: 'Components',
    component: LoadingSpinner,
} as Meta;

const Template: Story<PropsType> = (args: PropsType) => <LoadingSpinner {...args} />;

export const LoadingSpinners = Template.bind({});
LoadingSpinners.args = {
    size: 'small',
} as PropsType;
