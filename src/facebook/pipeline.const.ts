import dayjs from 'dayjs';
import Joi from 'joi';

import { InsightsOptions } from './facebook.repository';

export type Pipeline = {
    name: string;
    insightsOptions: InsightsOptions;
    validationSchema: Joi.Schema;
    schema: Record<string, any>[];
};

const actionBreakdownSchema = Joi.array().items({ action_type: Joi.string(), value: Joi.number() });

export const AGE_GENDER_INSIGHTS: Pipeline = {
    name: 'AgeGenderInsights',
    insightsOptions: {
        level: 'ad',
        fields: [
            'date_start',
            'date_stop',
            'account_id',
            'campaign_id',
            'campaign_name',
            'adset_id',
            'adset_name',
            'ad_id',
            'ad_name',
            'reach',
            'impressions',
            'cpc',
            'cpm',
            'ctr',
            'clicks',
            'spend',
            'actions',
            'action_values',
            'cost_per_action_type',
            'cost_per_unique_action_type',
        ],
        breakdowns: 'age,gender',
    },
    validationSchema: Joi.object({
        date_start: Joi.date().custom((value) => dayjs(value).format('YYYY-MM-DD')),
        date_stop: Joi.date().custom((value) => dayjs(value).format('YYYY-MM-DD')),
        age: Joi.string(),
        gender: Joi.string(),
        account_id: Joi.number().unsafe(),
        campaign_id: Joi.number().unsafe(),
        campaign_name: Joi.string(),
        adset_id: Joi.number().unsafe(),
        adset_name: Joi.string(),
        ad_id: Joi.number().unsafe(),
        ad_name: Joi.string(),
        reach: Joi.number(),
        impressions: Joi.number(),
        cpc: Joi.number(),
        cpm: Joi.number(),
        ctr: Joi.number(),
        clicks: Joi.number(),
        spend: Joi.number(),
        actions: actionBreakdownSchema,
        action_values: actionBreakdownSchema,
        cost_per_action_type: actionBreakdownSchema,
        cost_per_unique_action_type: actionBreakdownSchema,
    }),
    schema: [
        { name: 'date_start', type: 'DATE' },
        { name: 'date_stop', type: 'DATE' },
        { name: 'age', type: 'STRING' },
        { name: 'gender', type: 'STRING' },
        { name: 'account_id', type: 'NUMERIC' },
        { name: 'campaign_id', type: 'NUMERIC' },
        { name: 'campaign_name', type: 'STRING' },
        { name: 'adset_id', type: 'NUMERIC' },
        { name: 'adset_name', type: 'STRING' },
        { name: 'ad_id', type: 'NUMERIC' },
        { name: 'ad_name', type: 'STRING' },
        { name: 'reach', type: 'NUMERIC' },
        { name: 'impressions', type: 'NUMERIC' },
        { name: 'cpc', type: 'NUMERIC' },
        { name: 'cpm', type: 'NUMERIC' },
        { name: 'ctr', type: 'NUMERIC' },
        { name: 'clicks', type: 'NUMERIC' },
        { name: 'spend', type: 'NUMERIC' },
        {
            name: 'actions',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'action_values',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'cost_per_action_type',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'cost_per_unique_action_type',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
    ],
};

export const pipelines = { AGE_GENDER_INSIGHTS };
