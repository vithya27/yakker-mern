import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const usePost = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  const post = async (content) => {
    setIsLoading(true);
    setError(null);

    const userid = user.payload.id;

    const response = await fetch("http://127.0.0.1:5001/posts/create", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, userid }),
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

  return { post, isLoading, error };
};
