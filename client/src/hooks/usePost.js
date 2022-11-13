import { useState } from "react";

export const usePost = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const post = async (input) => {
    setIsLoading(true);
    setError(null);
    console.log(JSON.stringify({ input }));

    const response = await fetch("http://127.0.0.1:5001/posts/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });
    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
      console.log(error);
    }
    if (response.ok) {
      setIsLoading(false);
    }
  };

  return { post, isLoading, error };
};
