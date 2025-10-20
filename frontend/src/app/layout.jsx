import './global.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Dept Portfolio Auction</title>
        <link rel="icon" type="image/svg+xml" href="/logoipsum-icon.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ height: '100%' }}>
        {children}
      </body>
    </html>
  );
}
