import Hero from './components/Hero'
import SolverSection from './components/SolverSection'
import Patterns from './components/Patterns'
import Algorithms from './components/Algorithms'
import Feedback from './components/Feedback'
import './App.css'
import SolverPage from './components/SolverPage'
import AlgorithmPage from './components/AlgorithmPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/solver" element={<SolverPage />} /> */}
        <Route path="/solve" element={<SolverPage />} />
        <Route path="/algorithm" element={<AlgorithmPage />} />
        <Route path="/" element={
          <>
            <Hero />
            <SolverSection />
            <Patterns />
            <Algorithms />
            <Feedback />
          </>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
