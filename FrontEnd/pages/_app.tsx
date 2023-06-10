import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { initFirebase } from '../firebase/firebaseApp';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Layout } from '../components/layout/layout';
import { LayoutAdmin } from '../components/layout-admin/layout';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SSRProvider } from '@react-aria/ssr';
import { useEffect, useState } from 'react';

const lightTheme = createTheme({
   type: 'light',
   theme: {
      colors: {},
   },
});

const darkTheme = createTheme({
   type: 'dark',
   theme: {
      colors: {},
   },
});

function MyApp({ Component, pageProps }: AppProps) {
   const app = initFirebase();
   const auth = getAuth();
   const [user, loading] = useAuthState(auth);
   const [userStatus, setUserStatus] = useState("");

   useEffect(() => {
      if (user) {
         async function fetchData() {
            const response = await fetch(
               `http://127.0.0.1:8000/get_user_status/${user.email}`
            );
            const json = await response.json();
            console.log("status" + json.status);
            setUserStatus(json.status);
         }
         fetchData();
      }
   }, [user]);

   return (
      <SSRProvider>
         <NextThemesProvider
            defaultTheme="system"
            attribute="class"
            value={{
               light: lightTheme.className,
               dark: darkTheme.className,
            }}
         >
            <NextUIProvider>
               {user && userStatus == "admin" && <LayoutAdmin>
                  <Component {...pageProps} />
               </LayoutAdmin>}
               {user && userStatus == "manager" && <Layout>
                  <Component {...pageProps} />
               </Layout>}
               {!user && <Component {...pageProps} />}
            </NextUIProvider>
         </NextThemesProvider>
      </SSRProvider>
   );
}

export default MyApp;
