import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { getCurrentUser } from '~/actions/user';
import { Navbar } from '~/components/layout/Navbar';
import { SnackbarProvider } from '~/context/SnackbarProvider';
import { ThemeProvider } from '~/context/ThemeProvider';
import { generateWisblogMetadata } from '~/libs/generateWisblogMetadata';

export const dynamic = 'force-dynamic';
export const metadata = generateWisblogMetadata({ title: 'Wisblog' });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = await getCurrentUser();

  return (
    <html lang='ja'>
      <body>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider>
            <SnackbarProvider>
              <Navbar currentUser={currentUser} />
              {children}
            </SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
