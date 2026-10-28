import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter basename="/mgs">
      <div style={{ color: 'white', padding: '50px', fontSize: '24px' }}>
        🎉 MindGuard React is successfully mounted!
      </div>
    </BrowserRouter>
  );
}
