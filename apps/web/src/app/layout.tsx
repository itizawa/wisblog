import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Navbar } from '~/components/Navbar';
import { ThemeProvider } from '~/context/ThemeProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja'>
      <body>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider>
            <Navbar />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
