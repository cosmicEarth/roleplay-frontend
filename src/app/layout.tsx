import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Providers from "./providers";
import { ThemeProvider } from "./ThemeProvider";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    preload: true,
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${poppins.className} max-w-vw min-h-dvh max-h-dvh relative bg-white-0 dark:bg-black-900`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Providers>
                        {children}
                        <div id="modal-wrapper" />
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
