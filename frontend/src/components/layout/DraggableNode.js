// components/layout/DraggableNode.js

export const DraggableNode = ({ type, label, icon: Icon, data }) => {
    const onDragStart = (event, nodeType, nodeData) => {
        const appData = { nodeType, ...nodeData };
        event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            className="toolbar-node-card"
            onDragStart={(event) => onDragStart(event, type, data)}
            draggable
        >
            <div className="node-card-icon">
                {Icon && <Icon size={24} />}
            </div>
            <span className="node-card-label">{label}</span>
        </div>
    );
};
