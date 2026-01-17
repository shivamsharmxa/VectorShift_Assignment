// components/nodes/BaseNode.js
import { Handle, Position } from 'reactflow';

export const BaseNode = ({
    id,
    title,
    handles = [],
    children,
    width = 240,
    minHeight = 80,
    icon: Icon,
    selected
}) => {
    return (
        <div
            className={`base-node ${selected ? 'selected' : ''}`}
            style={{
                width: width,
                minHeight: minHeight
            }}
        >
            {handles.map((handle, index) => (
                <Handle
                    key={handle.id || `${handle.type}-${index}`}
                    type={handle.type}
                    position={handle.position}
                    id={handle.id}
                    style={handle.style}
                    className={`handle-${handle.type}`}
                />
            ))}

            <div className="node-header">
                <div className="node-title-group">
                    {Icon && <Icon className="node-icon" size={16} />}
                    <span className="node-title">{title}</span>
                </div>
            </div>

            <div className="node-content">
                {children}
            </div>
        </div>
    );
};
