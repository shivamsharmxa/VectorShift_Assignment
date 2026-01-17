// components/nodes/inputNode.js

import { useState, memo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Database } from 'lucide-react';
import { useStore } from '../../store/pipelineStore';

export const InputNode = memo(({ id, data, selected }) => {
    const updateNodeField = useStore((state) => state.updateNodeField);

    const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
    const [inputType, setInputType] = useState(data.inputType || 'Text');

    const handleNameChange = (e) => {
        const newValue = e.target.value;
        setCurrName(newValue);
        updateNodeField(id, 'inputName', newValue);
    };

    const handleTypeChange = (e) => {
        const newValue = e.target.value;
        setInputType(newValue);
        updateNodeField(id, 'inputType', newValue);
    };

    const handles = [
        { type: 'source', position: Position.Right, id: 'value' }
    ];

    return (
        <BaseNode id={id} title="Input" handles={handles} selected={selected} icon={Database}>
            <div className="node-field-group">
                <label>Name</label>
                <input
                    type="text"
                    value={currName}
                    onChange={handleNameChange}
                />
            </div>
            <div className="node-field-group">
                <label>Type</label>
                <select value={inputType} onChange={handleTypeChange}>
                    <option value="Text">Text</option>
                    <option value="File">File</option>
                </select>
            </div>
        </BaseNode>
    );
}, (prevProps, nextProps) => {
    return prevProps.id === nextProps.id &&
        prevProps.selected === nextProps.selected &&
        JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});

InputNode.displayName = 'InputNode';
