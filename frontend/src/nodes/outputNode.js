// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Database } from 'lucide-react';

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
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
}
