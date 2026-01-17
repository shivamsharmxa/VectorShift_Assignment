// apiNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Cloud } from 'lucide-react';

export const APINode = ({ id, data, selected }) => {
    const handles = [
        { type: 'target', position: Position.Left, id: 'trigger' },
        { type: 'source', position: Position.Right, id: 'response' }
    ];

    return (
        <BaseNode id={id} title="API" handles={handles} selected={selected} icon={Cloud}>
            <div className="node-field-group">
                <label>Endpoint</label>
                <input type="text" placeholder="https://api.example.com" />
            </div>
            <div className="node-field-group">
                <label>Method</label>
                <select>
                    <option>GET</option>
                    <option>POST</option>
                    <option>PUT</option>
                </select>
            </div>
        </BaseNode>
    );
}
