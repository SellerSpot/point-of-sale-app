import React from 'react';
import '../styles/core.css';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Sample } from '../components/Sample/Sample';

export default {
    title: 'Example/Page',
    component: Sample,
} as Meta;

const Template: Story = (args) => <Sample {...args} />;

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
