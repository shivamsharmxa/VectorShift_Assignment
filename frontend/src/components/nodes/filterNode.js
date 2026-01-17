// components/nodes/filterNode.js

import { useState, memo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { ListFilter } from 'lucide-react';
import { useStore } from '../../store/pipelineStore';

export const FilterNode = memo(({ id, data, selected }) => {
    const updateNodeField = useStore((state) => state.updateNodeField);

    const [field, setField] = useState(data?.field || '');
    const [operator, setOperator] = useState(data?.operator || 'contains');
    const [value, setValue] = useState(data?.value || '');

    const handleFieldChange = (e) => {
        const newValue = e.target.value;
        setField(newValue);
        updateNodeField(id, 'field', newValue);
    };

    const handleOperatorChange = (e) => {
        const newValue = e.target.value;
        setOperator(newValue);
        updateNodeField(id, 'operator', newValue);
    };

    const handleValueChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        updateNodeField(id, 'value', newValue);
    };

    const handles = [
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'filtered' }
    ];

    return (
        <BaseNode id={id} title="Filter" handles={handles} selected={selected} icon={ListFilter}>
            <div className="node-field-group">
                <label>Field</label>
                <input
                    type="text"
                    value={field}
                    onChange={handleFieldChange}
                />
            </div>
            <div className="node-field-group">
                <label>Operator</label>
                <select value={operator} onChange={handleOperatorChange}>
                    <option value="contains">Contains</option>
                    <option value="equals">Equals</option>
                    <option value="starts_with">Starts With</option>
                    <option value="ends_with">Ends With</option>
                </select>
            </div>
            <div className="node-field-group">
                <label>Value</label>
                <input
                    type="text"
                    value={value}
                    onChange={handleValueChange}
                />
            </div>
        </BaseNode>
    );
}, (prevProps, nextProps) => {
    return prevProps.id === nextProps.id &&
        prevProps.selected === nextProps.selected &&
        JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});

FilterNode.displayName = 'FilterNode';
