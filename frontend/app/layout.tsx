import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";

import dynamic from "next/dynamic";
import AppolloClient from "@/components/ApolloClient";
import AddClientModal from "@/components/AddClientModal";

const DynamicBootstrap = dynamic(
  () => require("bootstrap/dist/js/bootstrap.min.js"),
  { ssr: false }
);

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Project Management App",
  description: "Use this app to manage your projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppolloClient>
          <Header />
          <div className="container">
            <AddClientModal></AddClientModal>
            {children}
          </div>
        </AppolloClient>
      </body>
    </html>
  );
}
