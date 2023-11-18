import "./globals.css";

export const metadata = {
  title: "WebGIS",
  description: "WebGIS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/world.png" sizes="any" />
      <body className="no-scrollbar overflow-y-auto h-[100dvh] w-screen flex flex-col items-center font-Montserrat select-none">
        {children}
      </body>
    </html>
  );
}
