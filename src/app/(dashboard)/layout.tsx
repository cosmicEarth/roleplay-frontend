// app/dashboard/layout.tsx
import { PropsWithChildren } from "react";

import Sidebar from "@/components/organism/Sidebar/Sidebar";

type DashboardLayoutProps = PropsWithChildren<{}>;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex flex-1 max-w-vw min-h-dvh max-h-dvh flex-col">
            <Sidebar />
            <div
                // style={{ maxWidth: "calc(100vw - var(--dynamic-rem) - 1rem)" }}
                className="min-h-full flex flex-1 flex-col max-w-full flex-wrap"
            >
                <div className="flex flex-col flex-1 max-w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
