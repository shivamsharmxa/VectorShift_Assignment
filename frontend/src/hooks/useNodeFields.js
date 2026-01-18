// hooks/useNodeFields.js
import { useState, useCallback, useRef, useEffect } from 'react';
import { useStore } from '../store/pipelineStore';

/**
 * Custom hook to manage node field state and synchronization with Zustand store
 * Eliminates the need for manual state + handler duplication in each node
 * 
 * @param {string} nodeId - The node's unique ID
 * @param {Array} fieldConfigs - Array of field configurations
 * @param {object} initialData - Initial data from node.data
 * @returns {object} - Field values and change handlers
 */
export const useNodeFields = (nodeId, fieldConfigs, initialData = {}) => {
    const updateNodeField = useStore((state) => state.updateNodeField);

    // Initialize state for all fields
    const [fieldValues, setFieldValues] = useState(() => {
        const initial = {};
        fieldConfigs.forEach(field => {
            initial[field.name] = initialData[field.name] ?? field.defaultValue ?? '';
        });
        return initial;
    });

    // Create refs for textareas to enable auto-resize
    const textareaRefs = useRef({});

    // Auto-resize textareas when values change
    useEffect(() => {
        fieldConfigs.forEach(field => {
            if (field.type === 'textarea' && textareaRefs.current[field.name]) {
                const textarea = textareaRefs.current[field.name];
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
        });
    }, [fieldValues, fieldConfigs]);

    /**
     * Generic change handler for any field
     * Updates both local state and Zustand store
     */
    const handleFieldChange = useCallback((fieldName, value) => {
        setFieldValues(prev => ({ ...prev, [fieldName]: value }));
        updateNodeField(nodeId, fieldName, value);
    }, [nodeId, updateNodeField]);

    /**
     * Register a ref for a textarea field
     */
    const registerTextareaRef = useCallback((fieldName) => (ref) => {
        textareaRefs.current[fieldName] = ref;
    }, []);

    return {
        fieldValues,
        handleFieldChange,
        registerTextareaRef
    };
};
