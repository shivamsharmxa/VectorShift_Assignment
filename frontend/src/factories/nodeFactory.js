// factories/nodeFactory.js
import { memo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/nodes/BaseNode';
import { NodeField } from '../components/common/NodeField';
import { useNodeFields } from '../hooks/useNodeFields';
import { createNodeComparison } from '../utils/nodeHelpers';

/**
 * Build handles array from declarative config
 * @param {object} handlesConfig - {inputs: [...], outputs: [...], custom: [...]}
 * @returns {Array} - ReactFlow handles array
 */
const buildHandles = (handlesConfig) => {
    const handles = [];

    // Add input handles
    if (handlesConfig.inputs) {
        handlesConfig.inputs.forEach((id, index) => {
            const count = handlesConfig.inputs.length;
            handles.push({
                type: 'target',
                position: Position.Left,
                id,
                style: count > 1 ? {
                    top: `${((index + 1) * 100) / (count + 1)}%`
                } : undefined
            });
        });
    }

    // Add output handles
    if (handlesConfig.outputs) {
        handlesConfig.outputs.forEach((id, index) => {
            const count = handlesConfig.outputs.length;
            handles.push({
                type: 'source',
                position: Position.Right,
                id,
                style: count > 1 ? {
                    top: `${((index + 1) * 100) / (count + 1)}%`
                } : undefined
            });
        });
    }

    // Add custom handles (for advanced cases)
    if (handlesConfig.custom) {
        handles.push(...handlesConfig.custom);
    }

    return handles;
};

/**
 * Node Factory - Creates a complete node component from declarative config
 * Eliminates 50-75 lines of boilerplate per node
 * 
 * @param {NodeConfig} config - Node configuration object
 * @returns {React.Component} - Memoized node component
 * 
 * Example usage:
 * ```js
 * const FilterNode = createNode({
 *   type: 'filter',
 *   title: 'Filter',
 *   icon: ListFilter,
 *   handles: {
 *     inputs: ['input'],
 *     outputs: ['filtered']
 *   },
 *   fields: [
 *     { name: 'field', type: 'text', label: 'Field' },
 *     { name: 'operator', type: 'select', label: 'Operator', options: ['equals', 'contains'] }
 *   ]
 * });
 * ```
 */
export const createNode = (config) => {
    // Extract field names for efficient memo comparison
    const dataKeys = config.fields.map(f => f.name);

    // Create the node component
    const NodeComponent = ({ id, data, selected }) => {
        // Use the custom hook to manage all field state
        const { fieldValues, handleFieldChange, registerTextareaRef } = useNodeFields(
            id,
            config.fields,
            data
        );

        // Build handles from config
        const handles = buildHandles(config.handles);

        return (
            <BaseNode
                id={id}
                title={config.title}
                handles={handles}
                selected={selected}
                icon={config.icon}
            >
                {config.fields.map(fieldConfig => (
                    <NodeField
                        key={fieldConfig.name}
                        config={fieldConfig}
                        value={fieldValues[fieldConfig.name]}
                        onChange={handleFieldChange}
                        textareaRef={
                            fieldConfig.type === 'textarea'
                                ? registerTextareaRef(fieldConfig.name)
                                : null
                        }
                    />
                ))}
            </BaseNode>
        );
    };

    // Memoize with efficient comparison
    const MemoizedNode = memo(NodeComponent, createNodeComparison(dataKeys));

    // Set display name for debugging
    MemoizedNode.displayName = `${config.title}Node`;

    return MemoizedNode;
};
