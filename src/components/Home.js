// src/components/Home.js
import React from 'react';

const Home = () => {
  return (
    <main role="main">
      {/* Section 1: Welcome Message */}
      <section id="home">
        <h3>Welcome to the Personal Budget App</h3>
        <p>Manage your finances effectively with our easy-to-use budget tracker.</p>
      </section>

      {/* Section 2: Features of the App */}
      <section id="features">
        <h3>Features</h3>
        <ul>
          <li>Track income and expenses</li>
          <li>Set financial goals</li>
          <li>Generate reports</li>
        </ul>
      </section>
    </main>
  );
};

export default Home;
