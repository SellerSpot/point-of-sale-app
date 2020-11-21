import React from 'react';
import '../styles/core.module.css';
import { Story, Meta } from '@storybook/react/types-6-0';
import { StatusFlag, PropsType } from '../components/StatusFlag/StatusFlag';

export default {
    title: 'Components',
    component: StatusFlag,
} as Meta;

const Template: Story<PropsType> = (args: PropsType) => <StatusFlag {...args} />;

export const StatusFlags = Template.bind({});
StatusFlags.args = {
    type: 'completed',
} as PropsType;
