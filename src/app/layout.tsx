import "./globals.css";

import { Providers } from "../app/providers";
import { BlogProvider } from "../../context/blog-context";

export const metadata = {
  title: "Chatter App",
  description: "A Haven for Text-Based Content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <BlogProvider>
          <Providers>{children}</Providers>
        </BlogProvider>
      </body>
    </html>
  );
}
