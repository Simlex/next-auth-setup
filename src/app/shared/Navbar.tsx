'use client'
import { FunctionComponent, useEffect, useState } from "react";
import styles from "../../styles/Navbar.module.scss";
import Image from "next/image";
import images from "../../../public/images";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react"

interface NavbarProps {

}

const Navbar: FunctionComponent<NavbarProps> = () => {

    const { data: session, status } = useSession();

    console.log({session});

    return (
        <div className={styles.navbarContainer}>
            <div className={styles.navLinks}>
                <Link href="/">
                    <p className={styles.active}>Home</p>
                </Link>
                <Link href="/protected/dashboard">
                    <p className={styles.active}>Dashboard</p>
                </Link>
                <Link href="/about">
                    <p className={styles.active}>About us</p>
                </Link>
                <Link href="/contact">
                    <p className={styles.active}>Contact us</p>
                </Link>
            </div>
            <div className={styles.rhs}>
                {session && session.user ? (
                    <>
                        <Link href="/auth/signout">
                            Sign out
                        </Link>
                        <div className={styles.accountSection}>
                            <span className={styles.userImage}>
                                <Image src={images.user_avatar} alt="Avatar" />
                            </span>
                            <p>{session.user.name ?? session.user.email}</p>
                        </div>
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
        </div>
    );
}

export default Navbar;