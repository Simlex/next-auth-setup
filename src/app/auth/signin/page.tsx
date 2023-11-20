import SignInForm from "@/app/components/SignInForm";
import { FunctionComponent, ReactElement } from "react";
import styles from "../../../styles/authPages.module.scss";

interface SignInProps {
    
}
 
const SignIn: FunctionComponent<SignInProps> = ():ReactElement => {
    return ( 
        <div className={styles.authPage}>
            <div className={styles.topArea}>
                <h1>Sign in</h1>
                <p>Welcome back</p>
            </div>
            <SignInForm />
        </div>
     );
}
 
export default SignIn;