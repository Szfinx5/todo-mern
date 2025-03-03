/* eslint-disable react/no-unescaped-entities */
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useVerifyUser } from "@/helpers";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useVerifyUser();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
          formData,
          { withCredentials: true }
        );
        router.push("/tasks");
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    [formData, router]
  );

  return (
    <div className="login">
      <h2>Login</h2>
      <p>Please enter your email and password to access your task list.</p>
      <form onSubmit={handleSubmit}>
        <label>Email address:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={isLoading}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Please wait..." : "Login"}
        </button>

        <div className="new-account">
          Haven't got an account yet?
          <br />
          <Link href="/register" className="register-link">
            Click here to register.
          </Link>
        </div>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
