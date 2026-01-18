// components/common/NodeField.js
/**
 * Generic field renderer for node forms
 * Handles text inputs, textareas, and selects
 */
export const NodeField = ({
    config,
    value,
    onChange,
    textareaRef
}) => {
    const handleChange = (e) => {
        onChange(config.name, e.target.value);
    };

    const renderField = () => {
        switch (config.type) {
            case 'text':
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={handleChange}
                        placeholder={config.placeholder}
                    />
                );

            case 'textarea':
                return (
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={handleChange}
                        placeholder={config.placeholder}
                    />
                );

            case 'select':
                return (
                    <select value={value} onChange={handleChange}>
                        {config.options?.map(opt => {
                            // Handle both string[] and {value, label}[] formats
                            const optValue = typeof opt === 'string' ? opt : opt.value;
                            const optLabel = typeof opt === 'string' ? opt : opt.label;

                            return (
                                <option key={optValue} value={optValue}>
                                    {optLabel}
                                </option>
                            );
                        })}
                    </select>
                );

            default:
                return null;
        }
    };

    return (
        <div className="node-field-group">
            <label>{config.label}</label>
            {renderField()}
        </div>
    );
};
