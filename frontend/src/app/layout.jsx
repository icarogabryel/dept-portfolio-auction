export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
        <style>{`body { font-family: 'Montserrat', sans-serif; }`}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
