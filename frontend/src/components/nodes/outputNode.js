// components/nodes/outputNode.js

import { useState, memo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Database } from 'lucide-react';
import { useStore } from '../../store/pipelineStore';

export const OutputNode = memo(({ id, data, selected }) => {
    const updateNodeField = useStore((state) => state.updateNodeField);

    const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
    const [outputType, setOutputType] = useState(data.outputType || 'Text');

    const handleNameChange = (e) => {
        const newValue = e.target.value;
        setCurrName(newValue);
        updateNodeField(id, 'outputName', newValue);
    };

    const handleTypeChange = (e) => {
        const newValue = e.target.value;
        setOutputType(newValue);
        updateNodeField(id, 'outputType', newValue);
    };

    const handles = [
        { type: 'target', position: Position.Left, id: 'value' }
    ];

    return (
        <BaseNode id={id} title="Output" handles={handles} selected={selected} icon={Database}>
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
                <select value={outputType} onChange={handleTypeChange}>
                    <option value="Text">Text</option>
                    <option value="Image">Image</option>
                </select>
            </div>
        </BaseNode>
    );
}, (prevProps, nextProps) => {
    return prevProps.id === nextProps.id &&
        prevProps.selected === nextProps.selected &&
        JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});

OutputNode.displayName = 'OutputNode';
