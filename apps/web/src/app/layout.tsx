import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { fetchMe } from '~/actions/user';
import { Navbar } from '~/components/Navbar';
import { ThemeProvider } from '~/context/ThemeProvider';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = await fetchMe();

  return (
    <html lang='ja'>
      <body>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider>
            <Navbar currentUser={currentUser} />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
