// components/nodes/transformNode.js

import { useState, memo, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Zap } from 'lucide-react';
import { useStore } from '../../store/pipelineStore';

export const TransformNode = memo(({ id, data, selected }) => {
    const updateNodeField = useStore((state) => state.updateNodeField);
    const [script, setScript] = useState(data?.script || '');
    const scriptRef = useRef(null);

    // Auto-resize textarea
    useEffect(() => {
        if (scriptRef.current) {
            scriptRef.current.style.height = 'auto';
            scriptRef.current.style.height = `${scriptRef.current.scrollHeight}px`;
        }
    }, [script]);

    const handleScriptChange = (e) => {
        const newValue = e.target.value;
        setScript(newValue);
        updateNodeField(id, 'script', newValue);
    };

    const handles = [
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' }
    ];

    return (
        <BaseNode id={id} title="Transform" handles={handles} selected={selected} icon={Zap}>
            <div className="node-field-group">
                <label>Script</label>
                <textarea
                    ref={scriptRef}
                    value={script}
                    onChange={handleScriptChange}
                    placeholder="return data.map(x => x * 2);"
                />
            </div>
        </BaseNode>
    );
}, (prevProps, nextProps) => {
    return prevProps.id === nextProps.id &&
        prevProps.selected === nextProps.selected &&
        JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});

TransformNode.displayName = 'TransformNode';
