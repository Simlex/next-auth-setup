import { FunctionComponent, ReactElement, ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

interface ProtectedLayoutProps {
    children: ReactNode
}

const ProtectedLayout: FunctionComponent<ProtectedLayoutProps> = async ({ children }) => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return (
            <div>This protected, and you do not have access to it.</div>
        )
    }

    return (
        <>{children}</>
    );
}

export default ProtectedLayout;