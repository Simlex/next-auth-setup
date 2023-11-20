"use client";
import { SessionProvider } from 'next-auth/react';
import { FunctionComponent, ReactElement, ReactNode } from "react";

interface ProviderProps {
    children: ReactNode | ReactNode[];
}

const Provider: FunctionComponent<ProviderProps> = ({children}): ReactElement => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}

export default Provider;