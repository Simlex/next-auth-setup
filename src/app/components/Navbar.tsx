import { FunctionComponent, ReactElement } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

interface NavbarProps {

}

const Navbar: FunctionComponent<NavbarProps> = async () => {

    const session = await getServerSession(authOptions);

    return (
        <div style={{ backgroundColor: '#fff', color: '#222' }}>
            <Link href="/">
                Home
            </Link>
            <Link href="/protected/dashboard">
                Dashboard
            </Link>
            {session && session.user?.email ? (
                <>
                    <Link href="/auth/signout">
                        Sign out
                    </Link>
                    <p>Signed in as {session.user.email}</p>
                </>
            ) : (
                <>
                    <Link href="/auth/signin">
                        Sign in
                    </Link>
                    <Link href="/auth/signup">
                        Sign up
                    </Link></>
            )}
        </div>
    );
}

export default Navbar;