import React from 'react';
import '../styles/core.css';
import { Story, Meta } from '@storybook/react/types-6-0';
import {
    ProgressIndicator,
    IProgressIndicatorProps,
} from '../components/ProgressIndicator/ProgressIndicatort';
import { loadCSSValues } from '../config/cssVariables';

// used to load css variables in ts object into the :root context
loadCSSValues();

export default {
    title: 'Components',
    component: ProgressIndicator,
} as Meta;

const Template: Story<IProgressIndicatorProps> = (args: IProgressIndicatorProps) => (
    <ProgressIndicator {...args} />
);

export const ProgressIndicators = Template.bind({});
ProgressIndicators.args = {
    size: 'small',
    showLoading: true,
} as IProgressIndicatorProps;
