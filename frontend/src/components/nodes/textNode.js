// components/nodes/textNode.js

import { useState, useEffect, useRef, memo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Type } from 'lucide-react';
import { useStore } from '../../store/pipelineStore';
import { APP_CONFIG } from '../../utils';

export const TextNode = memo(({ id, data, selected }) => {
    const updateNodeField = useStore((state) => state.updateNodeField);

    const [currText, setCurrText] = useState(data?.text || '{{input}}');
    const [nodeWidth, setNodeWidth] = useState(data?.width || APP_CONFIG.defaultNodeWidth);
    const [variables, setVariables] = useState([]);

    const textareaRef = useRef(null);

    // Auto-resize height
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [currText]);

    // Handle variable detection and width resizing
    const handleTextChange = (e) => {
        const newText = e.target.value;
        setCurrText(newText);
        updateNodeField(id, 'text', newText);

        // Calculate width based on content
        const lines = newText.split('\n');
        const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);
        const calculatedWidth = Math.max(
            APP_CONFIG.minNodeWidth,
            Math.min(longestLine * APP_CONFIG.textNodeCharWidth + 80, APP_CONFIG.maxNodeWidth)
        );

        setNodeWidth(calculatedWidth);
        updateNodeField(id, 'width', calculatedWidth); // Persist width

        // Detect variables with proper JS naming rules
        const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
        let match;
        const detectedVariables = [];
        while ((match = regex.exec(newText)) !== null) {
            if (!detectedVariables.includes(match[1])) {
                detectedVariables.push(match[1]);
            }
        }
        setVariables(detectedVariables);
    };

    // Generate handles dynamically
    const handles = [
        ...variables.map((variable, index) => ({
            type: 'target',
            position: Position.Left,
            id: variable,
            style: { top: `${(index + 1) * (100 / (variables.length + 1))}%` } // Evenly distributed
        })),
        { type: 'source', position: Position.Right, id: 'output' }
    ];

    return (
        <BaseNode id={id} title="Text" handles={handles} selected={selected} icon={Type} width={nodeWidth}>
            <div className="node-field-group">
                <label>Text</label>
                <textarea
                    ref={textareaRef}
                    value={currText}
                    onChange={handleTextChange}
                    style={{ overflow: 'hidden', minHeight: '40px' }}
                />
                <div className="node-variable-tags">
                    {variables.map(v => (
                        <span key={v} className="text-node-variable-tag">{v}</span>
                    ))}
                </div>
            </div>
        </BaseNode>
    );
}, (prevProps, nextProps) => {
    return prevProps.id === nextProps.id &&
        prevProps.selected === nextProps.selected &&
        JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});

TextNode.displayName = 'TextNode';
