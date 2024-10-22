import { Box } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Suspense } from 'react';
import { getCurrentUser } from '~/actions/user';
import { Navbar } from '~/components/layout/Navbar';
import { LoadingBox } from '~/components/uiParts/LoadingBox';
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
  return (
    <html lang='ja'>
      <body>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider>
            <SnackbarProvider>
              <Suspense fallback={<Navbar currentUser={null} isLoading />}>
                <NavbarWrapper />
              </Suspense>
              <Suspense
                fallback={
                  <Box sx={{ pt: 5 }}>
                    <LoadingBox />
                  </Box>
                }
              >
                {children}
              </Suspense>
            </SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

const NavbarWrapper = async () => {
  const { currentUser } = await getCurrentUser();
  return <Navbar currentUser={currentUser} isLoading={false} />;
};
