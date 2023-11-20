import { ReactElement, FunctionComponent } from "react";

interface AboutProps {

}

const About: FunctionComponent<AboutProps> = (): ReactElement => {
    return (
        <div>
            <h1>About page</h1>
        </div>
    );
}

export default About;