import { redirect } from "next/navigation"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { auth } from "@/auth"

import LoginForm from "./_components/LoginForm"
import RegisterForm from "./_components/RegisterForm"
import GithubAuthBtn from "./_components/GithubAuthBtn"

const LoginPage = async () => {

  const session = await auth()

  if (session) {
    redirect("/")
  }

  return (
    <div className="container flex-1 flex flex-col items-center text-center space-y-4 py-36">
      <Card className="w-full max-w-md" >
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Sign in or sign up to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="cursor-pointer">Sign In</TabsTrigger>
              <TabsTrigger value="register" className="cursor-pointer">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <GithubAuthBtn />
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage