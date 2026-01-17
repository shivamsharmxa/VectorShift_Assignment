// components/nodes/aggregatorNode.js

import { useState, memo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { ArrowRightLeft } from 'lucide-react';
import { useStore } from '../../store/pipelineStore';

export const AggregatorNode = memo(({ id, data, selected }) => {
    const updateNodeField = useStore((state) => state.updateNodeField);

    const [operation, setOperation] = useState(data?.operation || 'Merge List');

    const handleOperationChange = (e) => {
        const newValue = e.target.value;
        setOperation(newValue);
        updateNodeField(id, 'operation', newValue);
    };

    const handles = [
        { type: 'target', position: Position.Left, id: 'input1', style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: 'input2', style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: 'output' }
    ];

    return (
        <BaseNode id={id} title="Aggregator" handles={handles} selected={selected} icon={ArrowRightLeft}>
            <div className="node-field-group">
                <label>Operation</label>
                <select value={operation} onChange={handleOperationChange}>
                    <option value="Merge List">Merge List</option>
                    <option value="Concatenate Strings">Concatenate Strings</option>
                    <option value="Sum Numbers">Sum Numbers</option>
                    <option value="Join Array">Join Array</option>
                </select>
            </div>
        </BaseNode>
    );
}, (prevProps, nextProps) => {
    return prevProps.id === nextProps.id &&
        prevProps.selected === nextProps.selected &&
        JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});

AggregatorNode.displayName = 'AggregatorNode';
