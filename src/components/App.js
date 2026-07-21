import React, { useState } from "react";
import LoginForm from "./LoginForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <h1>Parent Component</h1>

      {isLoggedIn ? (
        <h2>You are logged in!</h2>
      ) : (
        <LoginForm
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </div>
  );
}

export default App;