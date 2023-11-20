import SignUpForm from "@/app/components/SignUpForm";
import { FunctionComponent, ReactElement } from "react";
import styles from "../../../styles/authPages.module.scss";

interface SignUpPageProps {

}

const SignUpPage: FunctionComponent<SignUpPageProps> = (): ReactElement => {
    return (
        <div className={styles.authPage}>
            <div className={styles.topArea}>
                <h1>Sign up</h1>
                <p>Fill in details to create your account</p>
            </div>
            <SignUpForm />
        </div>
    );
}

export default SignUpPage;