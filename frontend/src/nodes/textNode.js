// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Type } from 'lucide-react';

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Extract variables from text (e.g., {{variableName}})
  useEffect(() => {
    const regex = /\{\{(\w+)\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const uniqueVars = [...new Set(matches.map(match => match[1]))];
    setVariables(uniqueVars);
  }, [currText]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Create input handles for each detected variable
  const dynamicHandles = variables.map((varName, index) => ({
    type: 'target',
    position: Position.Left,
    id: varName,
    style: { top: `${(index + 1) * 20 + 50}%` } // Minimal heuristic for distribution
  }));

  // Add output handle
  const handles = [
    ...dynamicHandles,
    { type: 'source', position: Position.Right, id: 'output' }
  ];

  return (
    <BaseNode id={id} title="Text" handles={handles} minHeight={100} selected={selected} icon={Type}>
      <div className="node-field-group">
        <label>Text</label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          rows={1}
          style={{ minHeight: '60px' }}
        />
        <span className="node-helper-text">
          Use {'{{variable}}'} to create dynamic inputs.
        </span>
      </div>
    </BaseNode>
  );
}
