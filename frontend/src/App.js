import { Toolbar } from './components/layout/Toolbar';
import { TopBar } from './components/layout/TopBar';
import { Canvas } from './components/layout/Canvas';
import { SubmitButton } from './components/common/SubmitButton';
import { ErrorBoundary } from './components/common/ErrorBoundary';


function App() {
  return (
    <ErrorBoundary>
      <div className="app-container">
        <TopBar />
        <div className="app-main">
          <Toolbar />
          <div className="app-canvas">
            <Canvas />
            <SubmitButton />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
