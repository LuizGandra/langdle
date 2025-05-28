import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './styles/globals.css'

const poppins = Poppins({
	variable: '--font-poppins',
	weight: ['400', '500'],
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Langdle',
	description: 'A daily language learning game!'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${poppins.variable} antialiased`}>{children}</body>
		</html>
	)
}
