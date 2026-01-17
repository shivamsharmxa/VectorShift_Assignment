import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { TopBar } from './TopBar';

function App() {
  return (
    <div className="app-container">
      <TopBar />
      <div className="app-main">
        <PipelineToolbar />
        <div className="app-canvas">
          <PipelineUI />
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}

export default App;
