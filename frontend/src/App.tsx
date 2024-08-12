import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { UpdateTimer } from './pages/UpdateTimer'
import './App.css'

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/updateTimer" element={<UpdateTimer />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
