"use client";

import { useState } from "react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const router = useRouter();

  const validateUsername = (): boolean => {
    if (username.trim() === "") {
      setUsernameError("Username is required");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validatePassword = (): boolean => {
    if (password.trim() === "") {
      setPasswordError("Password is required");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //check validations
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();

    if (!isPasswordValid) {
      return;
    }

    if (!isUsernameValid) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Handle successful login
        console.log("Login successful:", data);

        router.push("/dashboard");
      } else {
        // Handle login error
        console.error("Login failed:", data);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="text-3xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="grid gap-5">
        <Input
          title="username"
          value={username}
          error={usernameError}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <Input
          title="password"
          type="password"
          value={password}
          error={passwordError}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <Button type="submit" disabled={loading} className="mt-4">
          {loading ? <Spinner className="w-6 h-6" /> : "Login"}
        </Button>
      </form>
    </>
  );
}
