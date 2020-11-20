import React from 'react';
import '../styles/core.module.css';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Button, PropsType } from '../components/Button/Button';

export default {
    title: 'Components',
    component: Button,
} as Meta;

const Template: Story<PropsType> = (args: PropsType) => <Button {...args} />;

export const Buttons = Template.bind({});
Buttons.args = {
    label: 'Button Label',
    variant: 'default',
    type: 'solid',
    shape: 'default',
} as PropsType;
