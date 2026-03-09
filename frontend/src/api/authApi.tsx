import type { LoginRequest, LoginResponse } from "../types"

const url: string = "http://localhost:3000/auth/login"

export async function loginRequest(
     data : LoginRequest
    ): Promise<LoginResponse>{
        
    const res = await fetch(url, {
        method: "POST",
        headers: {
           "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    if (!res.ok) {
    const text = await res.text()    
    throw new Error(`login failed: ${res.status} - ${text}`)
}
    return res.json()
}



export async function api(url: string ,options: RequestInit ={}){

    const token = localStorage.getItem("token")

    return fetch(url,{
        ...options,
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
            ...options.headers
        }
    })
}