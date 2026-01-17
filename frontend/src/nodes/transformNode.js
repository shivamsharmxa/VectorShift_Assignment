// transformNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Zap } from 'lucide-react';

export const TransformNode = ({ id, data, selected }) => {
    const handles = [
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' }
    ];

    return (
        <BaseNode id={id} title="Transform" handles={handles} selected={selected} icon={Zap}>
            <div className="node-field-group">
                <label>Script</label>
                <textarea rows={3} placeholder="return input * 2;" />
            </div>
        </BaseNode>
    );
}
