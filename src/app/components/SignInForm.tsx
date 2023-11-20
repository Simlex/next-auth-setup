"use client"; // This runs on client side 
import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import styles from "../../styles/authPages.module.scss";
import { GithubIcon, GoogleIcon } from "./SVGs/SVGicons";

interface SignInFormProps {

}

const SignInForm: FunctionComponent<SignInFormProps> = (): ReactElement => {

    const router = useRouter();
    const { data, status } = useSession();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [message, setMessage] = useState('');

    const handleSubmit = async () => {

        // Start loader
        setIsLoading(true);

        const userInformation = {
            email,
            password,
            redirect: false,
        }

        await signIn('credentials', userInformation)
            .then((response) => {
                if (response?.error) {
                    console.log('Error message is available');
                    setMessage("Invalid credentials");
                }
                if (response && !response.error) {
                    router.refresh();
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                // Close loader
                setIsLoading(false);
            })
    }

    useEffect(() => {
        if (status === "authenticated") {
            // Refresh the page so we get the new session state to the server side
            router.refresh();
            // Push to homepage 
            router.push('/');
        }
    }, [status]);

    return (
        <div className={styles.signupContainer}>
            <input type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {message && <p>{message}</p>}
            <button onClick={handleSubmit}>
                {isLoading ? 'Loading' : 'Sign in'}
            </button>
            <button className={styles.socialBtn} onClick={async () => await signIn('google')}>
                <GoogleIcon />
                Sign in with google
            </button>
            <button className={styles.socialBtn} onClick={async () => await signIn('github')}>
                <GithubIcon />
                Sign in with github
            </button>
        </div>
    );
}

export default SignInForm;