import '../src/styles/globals.css'

export const metadata = {
  title: 'Talent Discovery',
  description: 'Talent Discovery Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}