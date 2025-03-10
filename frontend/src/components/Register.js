import { useState, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confPassword: "",
  });
  const { name, email, password, confPassword } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);

      const isPasswordValid = () => {
        const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (password.match(passw)) {
          if (password === confPassword) {
            return true;
          } else {
            setError("The password doesn't match");
            return false;
          }
        } else {
          setError(
            `Password needs to be between 6 to 20 characters and contain at least one numeric digit, one uppercase, and one lowercase letter.`
          );
          return false;
        }
      };

      if (!isPasswordValid()) return;

      setIsLoading(true);

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
          { name, email, password },
          { withCredentials: true }
        );
        router.push("/tasks");
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [name, email, password, confPassword, router]
  );

  return (
    <div className="register">
      <h2>Register</h2>
      <p>Please enter your email, password, and name to create your account.</p>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
          disabled={isLoading}
        />

        <label>Email address:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
          disabled={isLoading}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
          disabled={isLoading}
        />

        <label>Confirm password:</label>
        <input
          type="password"
          name="confPassword"
          value={confPassword}
          onChange={handleChange}
          required
          disabled={isLoading}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Register;
