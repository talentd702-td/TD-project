export const metadata = {
  title: 'Talent Discoveri',
  description: 'India\'s all women-led BFSI recruitment firm',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}