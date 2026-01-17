// components/nodes/conditionalNode.js

import { useState, memo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { GitMerge } from 'lucide-react';
import { useStore } from '../../store/pipelineStore';

export const ConditionalNode = memo(({ id, data, selected }) => {
    const updateNodeField = useStore((state) => state.updateNodeField);
    const [condition, setCondition] = useState(data?.condition || '');

    const handleConditionChange = (e) => {
        const newValue = e.target.value;
        setCondition(newValue);
        updateNodeField(id, 'condition', newValue);
    };

    const handles = [
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'true', style: { top: '33%' } },
        { type: 'source', position: Position.Right, id: 'false', style: { top: '66%' } }
    ];

    return (
        <BaseNode id={id} title="Conditional" handles={handles} selected={selected} icon={GitMerge}>
            <div className="node-field-group">
                <label>Condition</label>
                <input
                    type="text"
                    value={condition}
                    onChange={handleConditionChange}
                    placeholder="if x > 5"
                />
            </div>
        </BaseNode>
    );
}, (prevProps, nextProps) => {
    return prevProps.id === nextProps.id &&
        prevProps.selected === nextProps.selected &&
        JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});

ConditionalNode.displayName = 'ConditionalNode';
