"use client";
import { FunctionComponent, useEffect } from "react";
import { signOut } from "next-auth/react";

interface SignOutProps {

}

const SignOut: FunctionComponent<SignOutProps> = () => {
    useEffect(() => {
        signOut({
            callbackUrl: '/',
            redirect: true
        });
    }, []);
    return null;
}

export default SignOut;