import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Template from "./template";
import Header from "@/components/navigation/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "India Podcast",
  description: "India Podcast",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <Template>{children}</Template>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
