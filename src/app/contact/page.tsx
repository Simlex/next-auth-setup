import { ReactElement, FunctionComponent } from "react";

interface ContactProps {

}

const Contact: FunctionComponent<ContactProps> = (): ReactElement => {
    return (
        <div>
            <h1>Contact page</h1>
        </div>
    );
}

export default Contact;