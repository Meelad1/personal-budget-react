import React from 'react';
import './App.scss';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Contact from './components/Contact';
import ChartComponent from './components/Chart';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <Home />
      <Contact />
      <ChartComponent />
      <Footer />
    </div>
  );
}

export default App;
