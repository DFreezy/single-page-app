import './App.css';
import Header from './components/header'; // Ensure the filename matches the case
import About from './components/about';
import Signup from './components/signup';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header /> {/* Placed outside Routes to show on all pages */}
      <Routes>
        <Route path="/" element={<Home qoutes="You only live once" amount={79} languages="Typescript, Javascript, CSS, HTML" frameworks="React" libraries="Bootstrap, Tailwind" />} /> {/* Default route */}
        <Route path="/about" element={<About amount={79} languages="JS, HTML, CSS"  frameworks="React" libraries="Tailwind.css, Bootstrap.css" />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
