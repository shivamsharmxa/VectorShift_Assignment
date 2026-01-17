// components/nodes/llmNode.js

import { useState, memo, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Brain } from 'lucide-react';
import { useStore } from '../../store/pipelineStore';

export const LLMNode = memo(({ id, data, selected }) => {
    const updateNodeField = useStore((state) => state.updateNodeField);

    const [system, setSystem] = useState(data?.system || 'You are a helpful assistant.');
    const [prompt, setPrompt] = useState(data?.prompt || '');
    const [model, setModel] = useState(data?.model || 'gpt-3.5-turbo');

    const systemRef = useRef(null);
    const promptRef = useRef(null);

    // Auto-resize textareas
    useEffect(() => {
        if (systemRef.current) {
            systemRef.current.style.height = 'auto';
            systemRef.current.style.height = `${systemRef.current.scrollHeight}px`;
        }
    }, [system]);

    useEffect(() => {
        if (promptRef.current) {
            promptRef.current.style.height = 'auto';
            promptRef.current.style.height = `${promptRef.current.scrollHeight}px`;
        }
    }, [prompt]);

    const handleSystemChange = (e) => {
        const newValue = e.target.value;
        setSystem(newValue);
        updateNodeField(id, 'system', newValue);
    };

    const handlePromptChange = (e) => {
        const newValue = e.target.value;
        setPrompt(newValue);
        updateNodeField(id, 'prompt', newValue);
    };

    const handleModelChange = (e) => {
        const newValue = e.target.value;
        setModel(newValue);
        updateNodeField(id, 'model', newValue);
    };

    const handles = [
        { type: 'target', position: Position.Left, id: 'system', style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: 'prompt', style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: 'response' }
    ];

    return (
        <BaseNode id={id} title="LLM" handles={handles} selected={selected} icon={Brain}>
            <div className="node-field-group">
                <label>Model</label>
                <select value={model} onChange={handleModelChange}>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="claude-3-opus">Claude 3 Opus</option>
                    <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                </select>
            </div>
            <div className="node-field-group">
                <label>System</label>
                <textarea
                    ref={systemRef}
                    value={system}
                    onChange={handleSystemChange}
                />
            </div>
            <div className="node-field-group">
                <label>Prompt</label>
                <textarea
                    ref={promptRef}
                    value={prompt}
                    onChange={handlePromptChange}
                />
            </div>
        </BaseNode>
    );
}, (prevProps, nextProps) => {
    return prevProps.id === nextProps.id &&
        prevProps.selected === nextProps.selected &&
        JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});

LLMNode.displayName = 'LLMNode';
