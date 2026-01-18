// types/nodes.ts
// Minimal TypeScript types for core node logic

export type FieldType = 'text' | 'textarea' | 'select';

export interface SelectOption {
    value: string;
    label: string;
}

export interface NodeFieldConfig {
    name: string;
    type: FieldType;
    label: string;
    placeholder?: string;
    options?: SelectOption[] | string[];
    rows?: number;
}

export interface NodeHandlesConfig {
    inputs?: string[];
    outputs?: string[];
    custom?: Array<{
        type: 'target' | 'source';
        id: string;
        position: any; // Position from reactflow
        style?: Record<string, any>;
    }>;
}

export interface NodeConfig {
    type: string;
    title: string;
    icon: any; // React component
    handles: NodeHandlesConfig;
    fields: NodeFieldConfig[];
}

export interface PipelineNode {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: Record<string, any>;
}

export interface Edge {
    id: string;
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
}
