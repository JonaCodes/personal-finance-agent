import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { Moon, Sun } from 'lucide-react';
import Home from './components/Home';
import About from './components/About';

function App() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Router>
      <div style={{ position: 'relative' }}>
        <ActionIcon
          onClick={toggleColorScheme}
          variant="default"
          size="lg"
          aria-label="Toggle color scheme"
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          {computedColorScheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </ActionIcon>
        <nav>
          <Link to='/'>Home</Link> | <Link to='/about'>About</Link>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
