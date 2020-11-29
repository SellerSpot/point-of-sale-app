import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Button, IButtonProps } from '../components/Button/Button';
import { loadCSSValues } from '../config/cssVariables';

// used to load css variables in ts object into the :root context
loadCSSValues();

export default {
    title: 'Components',
    component: Button,
} as Meta;

const Template: Story<IButtonProps> = (args: IButtonProps) => <Button {...args} />;

export const Buttons = Template.bind({});
Buttons.args = {
    label: 'Sample LAbel',
} as IButtonProps;
