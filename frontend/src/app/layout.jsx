import './global.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Dept Portfolio Auction</title>
        <meta name="description" content="Auction platform for dept portfolios" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0158bd" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
