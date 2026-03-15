import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import type { UserDTO, Role } from "../../types/index";

export const UsersAdmin: React.FC = () => {
  const users = useUserStore((s) => s.users);
  const fetchUsers = useUserStore((s) => s.fetchUsers);
  const createUser = useUserStore((s) => s.createUser);
  const isLoading = useUserStore((s)=> s.isLoading)

  const [agentCode, setAgentCode] = useState("");
  const [fullName, setFullName] = useState(""); 
  const [role, setRole] = useState<Role>("Agent"); 

  console.log(typeof users);
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
const userData: UserDTO = {
        agentCode, fullName, role,
    };

    createUser(userData);

    setAgentCode("");
    setFullName("");
    setRole("Agent");
  };
  
  if (isLoading){
    return <div className="loading">loading</div>
  }

  
  return (
    
    <div className="users-admin">
      <h2>Users Admin</h2>

      <form onSubmit={handleSubmit} className="users-form">
        <Input
          placeholder="agentCode"
          value={agentCode}
          onChange={(e) => setAgentCode(e.target.value)}
        />
        <Input
          placeholder="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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
  )
  ;
};