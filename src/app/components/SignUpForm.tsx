"use client"; // This runs on client side 
import { FunctionComponent, ReactElement, useState } from "react";
import { signUp } from "../actions/users/signUp";
import { useRouter } from "next/navigation";
import styles from "../../styles/authPages.module.scss"

interface SignUpFormProps {

}

const SignUpForm: FunctionComponent<SignUpFormProps> = (): ReactElement => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [message, setMessage] = useState('');
    const [globalErrorMessage, setGlobalErrorMessage] = useState(false);

    // console.log(window.location.origin)

    const handleSubmit = async () => {
        console.log("Signup initialized...");

        if (!email || !password) {
            setGlobalErrorMessage(true);
            return;
        }

        const message = await signUp(email, password, firstName, lastName, phoneNumber);
        if (message.detail == 'User with this email already exist.') {
            console.log(message);
            setMessage(message.detail);
            return;
        } else {
            // setMessage(message.detail);
            router.push("/auth/signin");
        }
        console.log(message);
    }

    return (
        <div className={styles.signupContainer}>
            <input type="text" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="phoneNumber" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            {globalErrorMessage && <p>Please fill in all required fields</p>}
            <button onClick={handleSubmit}>Sign up</button>
            <p>{message}</p>
        </div>
    );
}

export default SignUpForm;