import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Input } from ".././components/Input";
import { Button } from ".././components/Button";
import { Navigate, useNavigate } from "react-router";

export const LoginPage: React.FC = () => {
  const login = useAuthStore((s) => s.login);
  const user = useAuthStore((s)=> s.user)
  const [agentCode, setAgentCode] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()


  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await login({ agentCode, password });
    
    if (user){
      navigate(user.role === "Admin"? "/admin": "/agent")
    }
    
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Agent Login</h2>
        <Input placeholder="Agent Code" value={agentCode} onChange={(e) => setAgentCode(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};