import Button from './components/Button';
import Input from './components/Input';
import { useState } from 'react';

function App() {
  const [text, setText] = useState('');

  return (
    <div style={{ padding: '2rem' }}>
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
