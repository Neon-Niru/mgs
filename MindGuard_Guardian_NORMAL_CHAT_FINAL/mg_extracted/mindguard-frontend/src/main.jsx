import React, { useEffect, Component } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo)
    this.setState({ errorInfo })
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: '#fff', background: '#1a1a1a', fontFamily: 'monospace', height: '100vh' }}>
          <h2 style={{ color: '#ff6b6b' }}>⚠️ React Rendering Error:</h2>
          <pre style={{ background: '#2a2a2a', padding: '20px', borderRadius: '8px', overflowX: 'auto' }}>
            {this.state.error && this.state.error.toString()}
          </pre>
          <h3>Component Stack:</h3>
          <pre style={{ background: '#2a2a2a', padding: '20px', borderRadius: '8px', overflowX: 'auto', fontSize: '12px' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

function RedirectHandler({ children }) {
  const navigate = useNavigate()
  useEffect(() => {
    const redirect = sessionStorage.getItem('redirect')
    if (redirect) {
      sessionStorage.removeItem('redirect')
      navigate(redirect.replace('/mgs', '') || '/', { replace: true })
    }
  }, [navigate])
  return children
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename="/mgs">
        <RedirectHandler>
          <App />
        </RedirectHandler>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
