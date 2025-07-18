import Button from './components/Button';
import Input from './components/Input';
import { useState } from 'react';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';

function App() {
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '2rem' }}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p className="basic setup completed">
        Click on the Vite and React logos to learn more
      </p>
      <hr style={{ margin: '2rem 0' }} />
      <h2>Reusable Components Test</h2>
      <Input
        placeholder="Enter something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={() => alert(`You typed: ${text}`)}>Click Me</Button>
    </div>
  );
}

export default App;
