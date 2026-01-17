// components/layout/Toolbar.js

import { useState } from 'react';
import { DraggableNode } from './DraggableNode';
import {
    FileText,
    ListFilter,
    Zap,
    GitMerge,
    ArrowRightLeft,
    Database,
    Type,
    Brain,
    Cloud,
    Combine
} from 'lucide-react';

export const Toolbar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const nodeTemplates = [
        { type: 'customInput', label: 'Input', icon: Database },
        { type: 'llm', label: 'LLM', icon: Brain },
        { type: 'customOutput', label: 'Output', icon: Database },
        { type: 'text', label: 'Text', icon: Type },
        { type: 'filter', label: 'Filter', icon: ListFilter },
        { type: 'transform', label: 'Transform', icon: Zap },
        { type: 'conditional', label: 'Conditional', icon: GitMerge },
        { type: 'aggregator', label: 'Aggregator', icon: ArrowRightLeft },
        { type: 'api', label: 'API', icon: Cloud },
    ];

    const filteredNodes = nodeTemplates.filter(node =>
        node.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="toolbar-panel">
            <div className="toolbar-header">
                <h3 className="toolbar-title">Components</h3>
                <input
                    type="text"
                    className="toolbar-search"
                    placeholder="Search components..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="toolbar-grid">
                {filteredNodes.map(node => (
                    <DraggableNode
                        key={node.type}
                        type={node.type}
                        label={node.label}
                        icon={node.icon}
                        data={node.data}
                    />
                ))}
            </div>
        </div>
    );
};
