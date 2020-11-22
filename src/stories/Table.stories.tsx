import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Table, PropsType } from '../components/Table/Table';

export default {
    title: 'Components',
    component: Table,
} as Meta;

const Template: Story<PropsType> = (args: PropsType) => <Table {...args} />;

export const Tables = Template.bind({});
Tables.args = {};
