"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react"

import { authClient } from "@/lib/auth-client";


export default function Home() {

  const { data: session } = authClient.useSession()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      name,
      password,
      callbackURL: "/dashboard"
    }, {
      onError: () => {
        window.alert("Something went wrong.");
      },
      onSuccess: () => {
        window.alert("User created successfully");
      },
    })
  }

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <h1>{session.user?.name} you are already logged in.</h1>
        <Button onClick={() => authClient.signOut()}>Logout</Button>
      </div>
    )
  }

  return (
    <div className=" p-4  flex flex-col gap-y-4">
      <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onSubmit}>Create User</Button>
    </div>
  );
}
