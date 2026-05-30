import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import { TooltipProvider } from "#/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://models.agent-one.dev"),
  title: {
    default: "AI Model Directory",
    template: "%s | AI Model Directory",
  },
  description:
    "The most comprehensive list of AI models, including pricing, context limits, features, and providers.",
  manifest: "/manifest.json",
  openGraph: {
    title: "AI Model Directory",
    description:
      "Browse pricing, context limits, features, and more across all major AI model providers.",
    url: "https://models.agent-one.dev",
    siteName: "AI Model Directory",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
