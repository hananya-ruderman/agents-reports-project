import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { loginRequest } from "../api/authApi";


export default function LoginPage(){

    const [agentCode,setAgentCode] = useState("");
    const [password,setPassword] = useState("");

    const login = useAuthStore(state => state.login)

    async function handleLogin(e:any){
        e.preventDefault()

        try {
            const json = {agentCode, password}
            const data = await loginRequest(json)
            login(data.user, data.token)
        }catch (err){
            console.log(err);
            
        }

        
    }

    return (
        <div>
            <form onSubmit={handleLogin}>

                <label id="agentCode">agentCode</label>
                <input
                    type="text"
                    id="agentCode"
                    value={agentCode}
                    onChange={e => setAgentCode(e.target.value)}/>

                <label id="password">password</label>
                <input
                     type="password"
                     id="password" value={password}
                     onChange={e => setPassword(e.target.value)}/>

                <button
                     type="submit">log in
                </button>

            </form>
        </div>
    )
}