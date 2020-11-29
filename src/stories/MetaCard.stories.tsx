import React from 'react';
import '../styles/core.css';
import { Story, Meta } from '@storybook/react/types-6-0';
import { MetaCard, IMetaCardProps } from '../components/MetaCard/MetaCard';
import { loadCSSValues } from '../config/cssVariables';

// used to load css variables in ts object into the :root context
loadCSSValues();

export default {
    title: 'Components',
    component: MetaCard,
} as Meta;

const Template: Story<IMetaCardProps> = (args: IMetaCardProps) => <MetaCard {...args} />;

export const MetaCards = Template.bind({});
MetaCards.args = {} as IMetaCardProps;
