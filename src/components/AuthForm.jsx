import { useState } from "react";
import { useUser } from "../contexts/user";

const AuthForm = () => {
  const user = useUser();
  const [userId, setUserId] = useState("");
  const login = () => {
    user.actions.login(userId);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        <button type="button" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
