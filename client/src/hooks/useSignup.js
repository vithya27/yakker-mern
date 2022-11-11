import { useState } from "react";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
    console.log(JSON.stringify({ email, password }));

    const response = await fetch("http://127.0.0.1:5001/users/create", {
      method: "PUT",
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      console.log(error);
    }
    if (response.ok) {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
