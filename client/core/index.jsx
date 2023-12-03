// Import React and any other necessary modules
import React from 'react';
import './index.css'; // Import your stylesheet if needed

// Define your React component
const App = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="index.css" />
      </head>
      <body>
        <div className="logo">
          <img src="logo.png" alt="Team Logo" />
        </div>
        <div>
          <nav>
            <a href="client\user\Signup.jsx">
              <button>Sign Up</button>
            </a>
            <a href="client\lib\Signin.jsx">
              <button>Sign In</button>
            </a>
          </nav>
        </div>
        <div className="backgroud-image"></div>
        <section>
          <h2>Welcome to Market Mingle</h2>
          <p>Buy and sell sporting goods here.</p>
        </section>
        <footer>
          <p>&copy; 2023 Market Mingle. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
};

// Export your component
export default App;
