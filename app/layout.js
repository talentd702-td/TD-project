export const metadata = {
  title: 'Talent Discoveri',
  description: 'India\'s insurance recruitment firm',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
