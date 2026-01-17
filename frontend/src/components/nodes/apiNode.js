// components/nodes/apiNode.js

import { useState, memo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Cloud } from 'lucide-react';
import { useStore } from '../../store/pipelineStore';

export const APINode = memo(({ id, data, selected }) => {
    const updateNodeField = useStore((state) => state.updateNodeField);

    const [endpoint, setEndpoint] = useState(data?.endpoint || '');
    const [method, setMethod] = useState(data?.method || 'GET');

    const handleEndpointChange = (e) => {
        const newValue = e.target.value;
        setEndpoint(newValue);
        updateNodeField(id, 'endpoint', newValue);
    };

    const handleMethodChange = (e) => {
        const newValue = e.target.value;
        setMethod(newValue);
        updateNodeField(id, 'method', newValue);
    };

    const handles = [
        { type: 'target', position: Position.Left, id: 'trigger' },
        { type: 'source', position: Position.Right, id: 'response' }
    ];

    return (
        <BaseNode id={id} title="API" handles={handles} selected={selected} icon={Cloud}>
            <div className="node-field-group">
                <label>Endpoint</label>
                <input
                    type="text"
                    value={endpoint}
                    onChange={handleEndpointChange}
                    placeholder="https://api.example.com"
                />
            </div>
            <div className="node-field-group">
                <label>Method</label>
                <select value={method} onChange={handleMethodChange}>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
            </div>
        </BaseNode>
    );
}, (prevProps, nextProps) => {
    return prevProps.id === nextProps.id &&
        prevProps.selected === nextProps.selected &&
        JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});

APINode.displayName = 'APINode';
