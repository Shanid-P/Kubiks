import Hero from './components/Hero'
import SolverSection from './components/SolverSection'
import Patterns from './components/Patterns'
import Algorithms from './components/Algorithms'
import Feedback from './components/Feedback'
import './App.css'
import SolverPage from './components/SolverPage'
import AlgorithmPage from './components/AlgorithmPage'
// import SolverPage from './components/test2'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/solver" element={<SolverPage />} /> */}
        <Route path="/solve" element={
          <>
            <SolverPage />
            <Footer/>
        </>} />
        <Route path="/algorithm" element={<AlgorithmPage />} />
        <Route path="/" element={
          <>
            {/* <Navbar/> */}
            <Hero />
            <SolverSection />
            <Patterns />
            <Algorithms />
            <Feedback />
            <Footer/>
          </>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
