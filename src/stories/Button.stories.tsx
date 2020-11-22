import React from 'react';
import '../styles/core.module.css';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Button, PropsType } from '../components/Button/Button';

export default {
    title: 'Components/Button',
    component: Button,
} as Meta;

const Template: Story<PropsType> = (args: PropsType) => <Button {...args} />;

export const DefaultButton = Template.bind({});
DefaultButton.args = {
    label: 'Button Label',
    variant: 'default',
    type: 'solid',
    shape: 'default',
    disabled: false,
    onClickCallback: () => {
        // eslint-disable-next-line no-console
        console.log('Hello there!');
    },
} as PropsType;
