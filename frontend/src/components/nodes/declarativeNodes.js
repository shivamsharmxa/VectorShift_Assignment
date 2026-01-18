// components/nodes/declarativeNodes.js
/**
 * Declarative Node Definitions using Node Factory
 * Each node is now < 15 lines of configuration
 * Demonstrates scalability to 50+ node types
 */

import {
    Database,
    Brain,
    Type,
    ListFilter,
    Zap,
    GitMerge,
    ArrowRightLeft,
    Cloud
} from 'lucide-react';
import { createNode } from '../../factories/nodeFactory';

/**
 * Input Node - Accepts external data
 */
export const InputNodeV2 = createNode({
    type: 'customInput',
    title: 'Input',
    icon: Database,
    handles: {
        outputs: ['value']
    },
    fields: [
        {
            name: 'inputName',
            type: 'text',
            label: 'Name',
            defaultValue: 'input_1'
        },
        {
            name: 'inputType',
            type: 'select',
            label: 'Type',
            options: ['Text', 'File'],
            defaultValue: 'Text'
        }
    ]
});

/**
 * Output Node - Exports results
 */
export const OutputNodeV2 = createNode({
    type: 'customOutput',
    title: 'Output',
    icon: Database,
    handles: {
        inputs: ['value']
    },
    fields: [
        {
            name: 'outputName',
            type: 'text',
            label: 'Name',
            defaultValue: 'output_1'
        },
        {
            name: 'outputType',
            type: 'select',
            label: 'Type',
            options: ['Text', 'Image'],
            defaultValue: 'Text'
        }
    ]
});

/**
 * LLM Node - AI model interaction
 */
export const LLMNodeV2 = createNode({
    type: 'llm',
    title: 'LLM',
    icon: Brain,
    handles: {
        inputs: ['system', 'prompt'],
        outputs: ['response']
    },
    fields: [
        {
            name: 'model',
            type: 'select',
            label: 'Model',
            options: [
                'gpt-3.5-turbo',
                'gpt-4',
                'claude-3-opus',
                'claude-3-sonnet'
            ],
            defaultValue: 'gpt-3.5-turbo'
        },
        {
            name: 'system',
            type: 'textarea',
            label: 'System',
            defaultValue: 'You are a helpful assistant.'
        },
        {
            name: 'prompt',
            type: 'textarea',
            label: 'Prompt',
            defaultValue: ''
        }
    ]
});

/**
 * Filter Node - Filter data based on conditions
 */
export const FilterNodeV2 = createNode({
    type: 'filter',
    title: 'Filter',
    icon: ListFilter,
    handles: {
        inputs: ['input'],
        outputs: ['filtered']
    },
    fields: [
        { name: 'field', type: 'text', label: 'Field', placeholder: 'e.g. status' },
        {
            name: 'operator',
            type: 'select',
            label: 'Operator',
            options: ['contains', 'equals', 'starts_with', 'ends_with'],
            defaultValue: 'contains'
        },
        { name: 'value', type: 'text', label: 'Value' }
    ]
});

/**
 * Transform Node - Apply transformations
 */
export const TransformNodeV2 = createNode({
    type: 'transform',
    title: 'Transform',
    icon: Zap,
    handles: {
        inputs: ['input'],
        outputs: ['output']
    },
    fields: [
        {
            name: 'script',
            type: 'textarea',
            label: 'Script',
            placeholder: 'return data.map(x => x * 2);'
        }
    ]
});

/**
 * Conditional Node - Branch logic
 */
export const ConditionalNodeV2 = createNode({
    type: 'conditional',
    title: 'Conditional',
    icon: GitMerge,
    handles: {
        inputs: ['input'],
        outputs: ['true', 'false']
    },
    fields: [
        {
            name: 'condition',
            type: 'text',
            label: 'Condition',
            placeholder: 'if x > 5'
        }
    ]
});

/**
 * Aggregator Node - Merge multiple inputs
 */
export const AggregatorNodeV2 = createNode({
    type: 'aggregator',
    title: 'Aggregator',
    icon: ArrowRightLeft,
    handles: {
        inputs: ['input1', 'input2'],
        outputs: ['output']
    },
    fields: [
        {
            name: 'operation',
            type: 'select',
            label: 'Operation',
            options: [
                'Merge List',
                'Concatenate Strings',
                'Sum Numbers',
                'Join Array'
            ],
            defaultValue: 'Merge List'
        }
    ]
});

/**
 * API Node - External API calls
 */
export const APINodeV2 = createNode({
    type: 'api',
    title: 'API',
    icon: Cloud,
    handles: {
        inputs: ['trigger'],
        outputs: ['response']
    },
    fields: [
        {
            name: 'endpoint',
            type: 'text',
            label: 'Endpoint',
            placeholder: 'https://api.example.com'
        },
        {
            name: 'method',
            type: 'select',
            label: 'Method',
            options: ['GET', 'POST', 'PUT', 'DELETE'],
            defaultValue: 'GET'
        }
    ]
});
