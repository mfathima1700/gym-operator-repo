"use client";


import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import  store  from '@/redux/store';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
  
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"  suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <Provider store={store}>
         {/* enableSystem */}
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
