# Node Factory System - Usage Guide

## Overview

The Node Factory System is a declarative approach to creating ReactFlow nodes that eliminates boilerplate and ensures consistency across all node types.

## Quick Start

### Creating a New Node

```javascript
import { createNode } from '../factories/nodeFactory';
import { MyIcon } from 'lucide-react';

export const MyCustomNode = createNode({
    type: 'myCustomNode',
    title: 'My Custom Node',
    icon: MyIcon,
    handles: {
        inputs: ['input1', 'input2'],
        outputs: ['output']
    },
    fields: [
        { name: 'fieldName', type: 'text', label: 'Field Label' },
        { name: 'dropdown', type: 'select', label: 'Options', options: ['A', 'B'] },
        { name: 'description', type: 'textarea', label: 'Description' }
    ]
});
```

That's it! **12 lines** vs **75 lines** of manual code.

---

## API Reference

### createNode(config)

Creates a complete, memoized node component from configuration.

#### Parameters:

**config** (Object):
- `type` (string): Node type identifier
- `title` (string): Display title
- `icon` (Component): Lucide React icon
- `handles` (Object): Handle configuration
  - `inputs` (string[]): Input handle IDs
  - `outputs` (string[]): Output handle IDs
  - `custom` (Object[]): Advanced custom handles
- `fields` (FieldConfig[]): Form field configurations

#### Field Configuration:

```typescript
{
    name: string;           // Field identifier (stored in node.data)
    type: 'text' | 'textarea' | 'select';
    label: string;          // Display label
    placeholder?: string;   // Placeholder text
    options?: string[];     // For select fields
    defaultValue?: any;     // Default value
}
```

---

## Examples

### Simple Node (1 input, 1 output)

```javascript
export const SimpleNode = createNode({
    type: 'simple',
    title: 'Simple',
    icon: Circle,
    handles: {
        inputs: ['in'],
        outputs: ['out']
    },
    fields: [
        { name: 'value', type: 'text', label: 'Value' }
    ]
});
```

### Complex Node (Multiple inputs/outputs)

```javascript
export const MergeNode = createNode({
    type: 'merge',
    title: 'Merge',
    icon: GitMerge,
    handles: {
        inputs: ['input1', 'input2', 'input3'],  // 3 inputs, evenly distributed
        outputs: ['merged']
    },
    fields: [
        { name: 'strategy', type: 'select', options: ['concat', 'join', 'merge'] }
    ]
});
```

### Node with Multiple Field Types

```javascript
export const DataProcessorNode = createNode({
    type: 'dataProcessor',
    title: 'Data Processor',
    icon: Zap,
    handles: {
        inputs: ['data'],
        outputs: ['processed']
    },
    fields: [
        { name: 'operation', type: 'select', label: 'Operation', 
          options: ['filter', 'map', 'reduce'] },
        { name: 'script', type: 'textarea', label: 'Script',
          placeholder: 'return data.map(x => x * 2)' },
        { name: 'timeout', type: 'text', label: 'Timeout (ms)',
          defaultValue: '5000' }
    ]
});
```

### Advanced: Custom Handle Positioning

```javascript
export const AdvancedNode = createNode({
    type: 'advanced',
    title: 'Advanced',
    icon: Settings,
    handles: {
        custom: [
            { type: 'target', position: Position.Left, id: 'tl', style: { top: '25%' } },
            { type: 'target', position: Position.Left, id: 'bl', style: { top: '75%' } },
            { type: 'source', position: Position.Right, id: 'out', style: { top: '50%' } }
        ]
    },
    fields: [...]
});
```

---

## How It Works

### 1. Factory Creates Component

```javascript
const NodeComponent = ({ id, data, selected }) => {
    // useNodeFields hook manages all state
    const { fieldValues, handleFieldChange } = useNodeFields(id, config.fields, data);
    
    // Handles built from config
    const handles = buildHandles(config.handles);
    
    // Renders BaseNode with generated fields
    return <BaseNode>...</BaseNode>;
};
```

### 2. Automatic Features

✅ **State Management**: Field values automatically synced with Zustand store  
✅ **Change Handlers**: Generic handler for all fields  
✅ **Auto-resize**: Textareas automatically expand  
✅ **Memoization**: Efficient re-render prevention  
✅ **Handle Distribution**: Inputs/outputs evenly spaced  

---

## Benefits

| Feature | Manual Node | Factory Node |
|---------|-------------|--------------|
| Lines of code | ~75 | ~12 |
| State hooks | 3-5 per field | 0 (automated) |
| Change handlers | 1 per field | 0 (automated) |
| Store sync | Manual | Automatic |
| Memo comparison | Manual (JSON.stringify) | Optimized (shallow) |
| Textarea resize | Manual refs/effects | Automatic |
| Maintenance | Update each node | Update factory once |

---

## Migration Guide

### Step 1: Keep Old Nodes (Backward Compatible)

Old nodes continue working:
```javascript
// Old approach still works
export const OldNode = memo(({ id, data }) => {
    // ... manual implementation
});
```

### Step 2: Create New Nodes with Factory

```javascript
// New nodes use factory
export const NewNode = createNode({...});
```

### Step 3: Gradually Migrate

When updating a node:
1. Convert to factory config
2. Test behavior matches
3. Remove old implementation

---

## Testing

Nodes created with the factory are easier to test:

```javascript
import { render } from '@testing-library/react';
import { MyNode } from './declarativeNodes';

test('renders with default values', () => {
    const { getByLabelText } = render(
        <MyNode id="test-1" data={{}} selected={false} />
    );
    
    expect(getByLabelText('Field Label')).toBeInTheDocument();
});
```

---

## TypeScript Support

Type definitions in `types/nodes.ts`:

```typescript
import { NodeConfig } from '../../types/nodes';

const config: NodeConfig = {
    type: 'typed',
    title: 'Typed Node',
    // ... TypeScript will validate structure
};
```

---

## Performance

Factory nodes are **more performant** than manual nodes:

1. **Efficient Memoization**: Only compares fields that changed
2. **No JSON.stringify**: Eliminates serialization overhead
3. **Shared Logic**: Less duplicate code = smaller bundle
4. **Optimized Re-renders**: Smart comparison prevents unnecessary updates

---

## Common Patterns

### Conditional Fields

```javascript
// All fields always visible
// For conditional logic, use external state management
```

### Dynamic Options

```javascript
fields: [
    { 
        name: 'model',
        type: 'select',
        label: 'Model',
        options: getAvailableModels() // Dynamic function
    }
]
```

### Custom Validation

Validation can be added in the `useNodeFields` hook or as a factory enhancement.

---

## Troubleshooting

### Node not registering

Ensure node is added to Canvas.js nodeTypes:
```javascript
const nodeTypes = {
    myCustomNode: MyCustomNode,
    // ...
};
```

### Field value not persisting

Check that field `name` matches the key in node.data.

### Handles not appearing

Verify handle IDs in `handles.inputs/outputs` arrays.

---

## Future Enhancements

Possible extensions to the factory:

- [ ] Field-level validation
- [ ] Conditional field visibility
- [ ] Custom field types
- [ ] Node-level actions (delete, duplicate)
- [ ] Drag handle customization
- [ ] Min/max width per node type

---

**The factory system makes VectorShift's node library infinitely scalable** 🚀
