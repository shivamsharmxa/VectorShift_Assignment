# 🏗️ Project Architecture Guide

## 📁 **New Directory Structure**

```
frontend/src/
├── components/
│   ├── nodes/                    # All node components
│   │   ├── BaseNode.js          # Abstract base for all nodes
│   │   ├── inputNode.js         # Input node implementation
│   │   ├── outputNode.js        # Output node implementation
│   │   ├── llmNode.js           # LLM node implementation
│   │   ├── textNode.js          # Text node with variables
│   │   ├── filterNode.js        # Filter node
│   │   ├── transformNode.js     # Transform node
│   │   ├── conditionalNode.js   # Conditional branching node
│   │   ├── aggregatorNode.js    # Aggregator node
│   │   ├── apiNode.js           # API call node
│   │   └── index.js             # Barrel export for all nodes
│   │
│   ├── layout/                   # Layout components
│   │   ├── TopBar.js            # Top navigation bar
│   │   ├── Toolbar.js           # Left sidebar with node templates
│   │   ├── Canvas.js            # Main ReactFlow canvas
│   │   ├── DraggableNode.js     # Draggable node template
│   │   └── index.js             # Barrel export for layout
│   │
│   └── common/                   # Reusable common components
│       ├── ErrorBoundary.js     # Error catching boundary
│       ├── ResultModal.js       # Pipeline result display modal
│       ├── SubmitButton.js      # Pipeline submission button
│       └── index.js             # Barrel export for common
│
├── hooks/                        # Custom React hooks
│   ├── useNodeData.js           # Hook for node data management
│   ├── usePipelineAPI.js        # Hook for API calls
│   └── index.js                 # Barrel export for hooks
│
├── store/                        # State management
│   └── pipelineStore.js         # Zustand store for pipeline state
│
├── utils/                        # Utility functions
│   ├── logger.js                # Logging utility
│   ├── config.js                # Configuration constants
│   └── index.js                 # Barrel export for utils
│
├── styles/                       # CSS styles
│   └── index.css                # Main stylesheet
│
├── tests/                        # Test files (future)
│   └── nodes/
│       └── (test files here)
│
├── App.js                        # Main App component
└── index.js                      # Application entry point
```

---

## 🎯 **Directory Purposes**

### **components/nodes/**
Contains all node implementations that extend BaseNode.

**Import pattern:**
```javascript
import { InputNode, OutputNode, TextNode } from '../components/nodes';
```

**Adding a new node:**
1. Create `newNode.js` in this directory
2. Extend `BaseNode`
3. Add export to `index.js`

### **components/layout/**
Contains components that define the application layout structure.

**Import pattern:**
```javascript
import { Toolbar, TopBar, Canvas } from '../components/layout';
```

### **components/common/**
Reusable UI components used across the application.

**Import pattern:**
```javascript
import { ErrorBoundary, ResultModal, SubmitButton } from '../components/common';
```

### **hooks/**
Custom React hooks for encapsulating reusable logic.

**Import pattern:**
```javascript
import { useNodeData, usePipelineAPI } from '../hooks';
```

**Example usage:**
```javascript
const { data, updateField } = useNodeData(nodeId);
const { loading, analyzePipeline } = usePipelineAPI();
```

### **store/**
Zustand store for global state management.

**Import pattern:**
```javascript
import { useStore } from '../store/pipelineStore';
```

### **utils/**
Utility functions and configuration.

**Import pattern:**
```javascript
import { logger, API_BASE_URL, APP_CONFIG } from '../utils';
```

### **styles/**
CSS files organized by concern.

**Import pattern:**
```javascript
import './styles/index.css';
```

---

## 🔗 **Import Path Examples**

### From a Node Component:
```javascript
// components/nodes/inputNode.js
import { BaseNode } from './BaseNode';                      // Sibling
import { useStore } from '../../store/pipelineStore';       // Go up 2 levels
import { useNodeData } from '../../hooks';                  // Go up 2 levels
import { logger } from '../../utils';                       // Go up 2 levels
```

### From App.js:
```javascript
// App.js (root level)
import { Toolbar, TopBar, Canvas } from './components/layout';
import { ErrorBoundary, SubmitButton } from './components/common';
```

### From a Layout Component:
```javascript
// components/layout/Canvas.js
import { useStore } from '../../store/pipelineStore';       // Go up 2 levels
import { InputNode, LLMNode } from '../nodes';              // Sibling directory
```

---

## 📦 **Barrel Exports (index.js)**

Barrel exports simplify imports by allowing you to import multiple items from a directory.

**Instead of:**
```javascript
import { InputNode } from './components/nodes/inputNode';
import { OutputNode } from './components/nodes/outputNode';
import { TextNode } from './components/nodes/textNode';
```

**You can do:**
```javascript
import { InputNode, OutputNode, TextNode } from './components/nodes';
```

### How it works:
`components/nodes/index.js` re-exports all nodes:
```javascript
export { BaseNode } from './BaseNode';
export { InputNode } from './inputNode';
export { OutputNode } from './outputNode';
// ... etc
```

---

## 🎨 **Component Hierarchy**

```
App
├── ErrorBoundary (wraps entire app)
│   ├── TopBar
│   ├── Toolbar
│   │   └── DraggableNode (multiple instances)
│   ├── Canvas (ReactFlow)
│   │   ├── InputNode (multiple instances)
│   │   ├── OutputNode (multiple instances)  
│   │   ├── LLMNode (multiple instances)
│   │   ├── TextNode (multiple instances)
│   │   └── ... (other nodes)
│   └── SubmitButton
│       └── ResultModal (conditionally rendered)
```

---

## 🔄 **Data Flow**

```
User Action
    ↓
Component Event Handler
    ↓
Zustand Store (pipelineStore.js)
    ↓
React Re-render
    ↓
Updated UI
```

### Example: Updating Node Data

```javascript
// 1. User types in Input node
const handleNameChange = (e) => {
  const newValue = e.target.value;
  
  // 2. Update local state (for immediate UI feedback)
  setCurrName(newValue);
  
  // 3. Update global store (for persistence)
  updateNodeField(id, 'inputName', newValue);
};

// 4. Store updates
// 5. Components subscribed to store re-render
// 6. When Submit clicked, store has latest data
```

---

## 🧩 **Key Patterns**

### 1. **Custom Hooks for Logic Separation**

**Before:**
```javascript
// All logic in component
const SubmitButton = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(...);
      // ... more logic
    } catch (error) {
      // ... error handling
    } finally {
      setLoading(false);
    }
  };
  
  return <button onClick={handleSubmit}>Submit</button>;
};
```

**After:**
```javascript
// Logic in custom hook
const { loading, result, analyzePipeline } = usePipelineAPI();

const handleSubmit = () => {
  analyzePipeline(nodes, edges);
};

return <button onClick={handleSubmit}>Submit</button>;
```

### 2. **Barrel Exports for Clean Imports**

**Before:**
```javascript
import { InputNode } from './components/nodes/inputNode';
import { OutputNode } from './components/nodes/outputNode';
import { LLMNode } from './components/nodes/llmNode';
import { TextNode } from './components/nodes/textNode';
import { FilterNode } from './components/nodes/filterNode';
```

**After:**
```javascript
import { 
  InputNode, 
  OutputNode, 
  LLMNode, 
  TextNode, 
  FilterNode 
} from './components/nodes';
```

### 3. **Centralized Configuration**

**Before:**
```javascript
// Scattered across files
const API_URL = 'http://localhost:8000';
const NODE_WIDTH = 240;
```

**After:**
```javascript
// utils/config.js
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
export const APP_CONFIG = {
  defaultNodeWidth: 240,
  minNodeWidth: 240,
  maxNodeWidth: 600,
};

// Usage
import { API_BASE_URL, APP_CONFIG } from '../utils';
```

---

## 🚀 **Adding New Features**

### Adding a New Node Type:

1. **Create the node file:**
```bash
touch src/components/nodes/myNewNode.js
```

2. **Implement the node:**
```javascript
// components/nodes/myNewNode.js
import { memo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Zap } from 'lucide-react';
import { useStore } from '../../store/pipelineStore';

export const MyNewNode = memo(({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  
  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'output' }
  ];
  
  return (
    <BaseNode id={id} title="My New Node" handles={handles} selected={selected} icon={Zap}>
      {/* Your node content */}
    </BaseNode>
  );
});

MyNewNode.displayName = 'MyNewNode';
```

3. **Export from index.js:**
```javascript
// components/nodes/index.js
export { MyNewNode } from './myNewNode';
```

4. **Add to Canvas nodeTypes:**
```javascript
// components/layout/Canvas.js
import { MyNewNode } from '../nodes';

const nodeTypes = {
  // ... existing
  myNew: MyNewNode,
};
```

5. **Add to Toolbar:**
```javascript
// components/layout/Toolbar.js
const nodeTemplates = [
  // ... existing
  { type: 'myNew', label: 'My New Node', icon: Zap },
];
```

### Adding a New Hook:

1. **Create hook file:**
```bash
touch src/hooks/useMyHook.js
```

2. **Implement the hook:**
```javascript
// hooks/useMyHook.js
import { useState } from 'react';

export const useMyHook = () => {
  const [state, setState] = useState();
  
  // Your hook logic
  
  return { state, setState };
};
```

3. **Export from index.js:**
```javascript
// hooks/index.js
export { useMyHook } from './useMyHook';
```

4. **Use it:**
```javascript
import { useMyHook } from '../hooks';

const MyComponent = () => {
  const { state } = useMyHook();
  // ...
};
```

---

## ✅ **Benefits of This Architecture**

### 1. **Scalability**
- Easy to add new features without touching existing code
- Clear separation of concerns
- Modular structure

### 2. **Maintainability**
- Logic is organized and easy to find
- Changes in one area don't affect others
- Clear naming conventions

### 3. **Reusability**
- Hooks can be used across components
- Common components avoid duplication
- Barrel exports make imports clean

### 4. **Testability**
- Hooks can be tested independently
- Components are isolated
- Clear boundaries between layers

### 5. **Developer Experience**
- Intuitive file organization
- Easy to navigate
- Clear import paths

---

## 📚 **Further Reading**

- **Zustand Documentation**: https://github.com/pmndrs/zustand
- **ReactFlow Documentation**: https://reactflow.dev/
- **React Hooks**: https://react.dev/reference/react
- **Barrel Exports**: https://basarat.gitbook.io/typescript/main-1/barrel

---

## 🎯 **Quick Reference Card**

| Task | Directory | Import From |
|------|-----------|-------------|
| Create new node | `components/nodes/` | `../components/nodes` |
| Create layout component | `components/layout/` | `../components/layout` |
| Create reusable component | `components/common/` | `../components/common` |
| Create custom hook | `hooks/` | `../hooks` |
| Add utility function | `utils/` | `../utils` |
| Modify state management | `store/` | `../store/pipelineStore` |
| Add styles | `styles/` | `../styles/index.css` |
| Add tests | `tests/` | N/A |

---

**This architecture follows industry best practices and is ready for production deployment!** 🚀
