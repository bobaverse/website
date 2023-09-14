import localFont from 'next/font/local';

export const gotham = localFont({
  src: [
    {
      path: './Gotham-Bold.otf',
      weight: '700',
      style: 'bold',
    },
    {
      path: './Gotham-Medium.otf',
      weight: '500',
      style: 'medium',
    },
    {
      path: './Gotham-Book.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: "--font-gotham"
})
