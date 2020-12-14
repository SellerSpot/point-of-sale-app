import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { loadCSSValues } from '../config/cssVariables';
import { IToggleButtonProps, ToggleButton } from '../components/ToggleButton/ToggleButton';

// used to load css variables in ts object into the :root context
loadCSSValues();

export default {
    title: 'Components',
    component: ToggleButton,
} as Meta;

const Template: Story<IToggleButtonProps> = (args: IToggleButtonProps) => <ToggleButton {...args} />;

export const ToggleButtons = Template.bind({});
ToggleButtons.args = {
    active: true,
    toggleCallback: (activeStatus) => alert(activeStatus),
} as IToggleButtonProps;
