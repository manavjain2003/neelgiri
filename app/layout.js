import "./globals.css";

export const metadata = {
  title: "Neelgiri Chemicals | Powering a Cleaner Tomorrow",
  description:
    "Premium quality chemicals, crafted for a sustainable and innovative future.",
};

export default function RootLayout({ children }) {
  return (
<html lang="en" suppressHydrationWarning>
  <body className="relative" suppressHydrationWarning>
    {children}
  </body>
</html>
  );
}
