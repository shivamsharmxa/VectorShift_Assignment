// BaseNode.js
import { Handle, Position } from 'reactflow';
import { X, MoreHorizontal } from 'lucide-react';

export const BaseNode = ({
    id,
    title,
    handles = [],
    children,
    width = 240,
    minHeight = 150,
    selected = false,
    className = '',
    onDelete,
    icon: Icon // Accept an icon component
}) => {
    const nodeClassName = `base-node${selected ? ' selected' : ''}${className ? ' ' + className : ''}`;

    return (
        <div
            className={nodeClassName}
            style={{ width: `${width}px`, minHeight: `${minHeight}px` }}
        >
            {/* Render all handles */}
            {handles.map((handle, index) => (
                <Handle
                    key={`${id}-${handle.id || index}`}
                    type={handle.type}
                    position={handle.position}
                    id={`${id}-${handle.id || index}`}
                    className={`node-handle`} // Styles handled by index.css now
                    style={handle.style || {}}
                />
            ))}

            {/* Node header */}
            <div className="node-header">
                {Icon && (
                    <div className="node-icon-wrapper">
                        <Icon size={16} />
                    </div>
                )}
                <span className="node-title">{title}</span>
                {/* Optional: Add delete or menu button later */}
            </div>

            {/* Node content */}
            <div className="node-content">
                {children}
            </div>
        </div>
    );
};
