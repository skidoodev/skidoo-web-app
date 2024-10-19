import { ReactNode } from "react";

export default function layout({ children } : { children : ReactNode }) {
    return (
        <div className="flex justify-center items-center bg-backgroud-pop flex-col h-screen w-screen relative">
            <div className="mt-2">{children}</div>
        </div>
    )
}