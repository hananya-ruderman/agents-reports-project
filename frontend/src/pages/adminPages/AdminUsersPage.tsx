import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import type { UserDTO, Role } from "../../types/index";

export const UsersAdmin: React.FC = () => {
  const users = useUserStore((s) => s.users);
  const fetchUsers = useUserStore((s) => s.fetchUsres);
  const createUser = useUserStore((s) => s.createUser);

  const [agentCode, setAgentCode] = useState("");
  const [password, setPassword] = useState(""); 
  const [role, setRole] = useState<Role>("Agent"); 



  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData: UserDTO = {
        agentCode, password, role,
    };

    await createUser(userData);

    setAgentCode("");
    setPassword("");
    setRole("Agent");
  };

  return (
    <div className="users-admin">
      <h2>Users Admin</h2>

      <form onSubmit={handleSubmit} className="users-form">
        <Input
          placeholder="Name"
          value={agentCode}
          onChange={(e) => setAgentCode(e.target.value)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
        />
        <Button type="submit">Create User</Button>
      </form>

      <h3>All Users</h3>
      <Table data={users} />
    </div>
  );
};