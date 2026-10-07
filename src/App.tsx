import { Routes, Route, Navigate } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Patterns from './pages/Patterns'
import Practice from './pages/Practice'
import Playground from './pages/Playground'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/:langId" element={<Learn />} />
        <Route path="/patterns" element={<Patterns />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
