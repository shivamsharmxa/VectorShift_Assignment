// conditionalNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { GitMerge } from 'lucide-react';

export const ConditionalNode = ({ id, data, selected }) => {
    const handles = [
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'true' },
        { type: 'source', position: Position.Right, id: 'false' }
    ];

    return (
        <BaseNode id={id} title="Conditional" handles={handles} selected={selected} icon={GitMerge}>
            <div className="node-field-group">
                <label>Condition</label>
                <input type="text" placeholder="e.g. x > 10" />
            </div>
        </BaseNode>
    );
}
