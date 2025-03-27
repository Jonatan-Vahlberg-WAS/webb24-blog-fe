import { useState } from "react";
import { useUser } from "../contexts/user";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  const user = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);

  const login = () => {
    user.actions.login(email, password, () => {
      navigate("/");
    });
  };
  const register = () => {
    user.actions.register(email, password, name);
  };

  return (
    <div>
      <div>
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="······"
            required
          />
        </div>
        {!isLoginMode && (
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter your name"
              required
            />
          </div>
        )}
        <div>
          <button type="button" onClick={isLoginMode ? login : register}>
            {isLoginMode ? "Login" : "Register"}
          </button>
        </div>
        <p>
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}
        </p>
        <div>
          <button type="button" onClick={() => setIsLoginMode(!isLoginMode)}>
            {isLoginMode ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
