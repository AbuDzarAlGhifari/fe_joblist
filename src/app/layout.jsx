import './globals.css';

export const metadata = {
  title: 'JoBSkuy',
  description: 'Generate',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-noto antialiased`}>{children}</body>
    </html>
  );
}
