import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import QueryProvider from "@/components/providers/query.provider";
import { Toaster } from "@/components/ui/sonner";

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700", "300"],
  subsets: ["latin"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "Telegram web",
  description: "Telegram web application clone created by Ixtiyor",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body
          suppressHydrationWarning={true}
          className={`${spaceGrotesk.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <main>{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
