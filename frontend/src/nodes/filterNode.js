// filterNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { ListFilter } from 'lucide-react'; // Changed to ListFilter as 'filter' might be reserved/svg

export const FilterNode = ({ id, data, selected }) => {
    const handles = [
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'filtered' }
    ];

    return (
        <BaseNode id={id} title="Filter" handles={handles} selected={selected} icon={ListFilter}>
            <div className="node-field-group">
                <label>Field</label>
                <input type="text" placeholder="e.g. status" />
            </div>
            <div className="node-field-group">
                <label>Operator</label>
                <select>
                    <option>Equals</option>
                    <option>Contains</option>
                    <option>Greater Than</option>
                </select>
            </div>
        </BaseNode>
    );
}
