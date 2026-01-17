// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Brain } from 'lucide-react';
import { useState } from 'react';

export const LLMNode = ({ id, data, selected }) => {
  // Use data.provider if available (from drag), otherwise default
  const provider = data?.provider || 'OpenAI';

  // Local state for fields (frontend only)
  const [system, setSystem] = useState(data?.system || '');
  const [prompt, setPrompt] = useState(data?.prompt || '');
  const [model, setModel] = useState(data?.model || 'gpt-4');

  const handles = [
    { type: 'target', position: Position.Left, id: 'system', style: { top: '30%' } },
    { type: 'target', position: Position.Left, id: 'prompt', style: { top: '60%' } },
    { type: 'source', position: Position.Right, id: 'response' }
  ];

  return (
    <BaseNode
      id={id}
      title={`${provider} LLM`}
      handles={handles}
      selected={selected}
      icon={Brain}
    >
      <div className="node-field-group">
        <label>Model</label>
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-3.5">GPT-3.5 Turbo</option>
          <option value="claude-3-opus">Claude 3 Opus</option>
          <option value="claude-3-sonnet">Claude 3 Sonnet</option>
          <option value="gemini-pro">Gemini Pro</option>
          <option value="llama-3">Llama 3</option>
        </select>
      </div>

      <div className="node-field-group">
        <label>System</label>
        <textarea
          value={system}
          onChange={(e) => setSystem(e.target.value)}
          rows={2}
          placeholder="You are a helpful assistant..."
        />
      </div>

      <div className="node-field-group">
        <label>Prompt</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          placeholder="Enter your prompt here..."
        />
      </div>
    </BaseNode>
  );
}
