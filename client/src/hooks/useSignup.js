import { useState } from "react";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (email, password, username) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://127.0.0.1:5001/users/create", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
