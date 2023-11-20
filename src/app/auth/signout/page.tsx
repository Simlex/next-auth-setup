import SignOut from "@/app/components/SignOut";
import { FunctionComponent, ReactElement } from "react";

interface SignOutPageProps {

}

const SignOutPage: FunctionComponent<SignOutPageProps> = (): ReactElement => {
    return (
        <SignOut />
    );
}

export default SignOutPage;