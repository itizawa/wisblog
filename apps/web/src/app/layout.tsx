import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { fetchMe } from '~/actions/user';
import { Navbar } from '~/components/Navbar';
import { SnackbarProvider } from '~/context/SnackbarProvider';
import { ThemeProvider } from '~/context/ThemeProvider';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await fetchMe();

  return (
    <html lang='ja'>
      <body>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider>
            <SnackbarProvider>
              <Navbar currentUser={result.isSuccess ? result.data.currentUser : undefined} />
              {children}
            </SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
