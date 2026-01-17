// aggregatorNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { ArrowRightLeft } from 'lucide-react';

export const AggregatorNode = ({ id, data, selected }) => {
    const handles = [
        { type: 'target', position: Position.Left, id: 'input1' },
        { type: 'target', position: Position.Left, id: 'input2' },
        { type: 'source', position: Position.Right, id: 'output' }
    ];

    return (
        <BaseNode id={id} title="Aggregator" handles={handles} selected={selected} icon={ArrowRightLeft}>
            <div className="node-field-group">
                <label>Operation</label>
                <select>
                    <option>Merge List</option>
                    <option>Concatenate Strings</option>
                </select>
            </div>
        </BaseNode>
    );
}
