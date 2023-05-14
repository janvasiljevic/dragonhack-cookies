import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { AxiosError } from 'axios';

import '@fontsource/abril-fatface';
import '@fontsource/anonymous-pro';
import '@fontsource/source-sans-pro';
import AddBook from './modals/AddBook';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const axError = error as AxiosError;

        // Dont retry on the following errors
        switch (axError.response?.status) {
          case 401: // Unauthorized
          case 403: // Forbidden
          case 404: // Not found
            return false;
        }

        if (failureCount < 2) return true;

        return false;
      },
    },
  },
});

const modals = {
  addBook: AddBook,
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={{
          primaryColor: 'grape',
          primaryShade: 7,
          fontFamily: 'Source Sans Pro',
          headings: {
            fontFamily: 'Abril Fatface',
            fontWeight: 300,
          },
          fontFamilyMonospace: 'Anonymous Pro',
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ModalsProvider modals={modals}>
          <Notifications position="top-left" />
          <Suspense fallback={<></>}>
            <RouterProvider router={router} />
          </Suspense>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

// Custom theme (other subprop)
declare module '@mantine/core' {
  export interface MantineThemeOther {
    otherStuff: string;
  }
}

// Custom context modals
declare module '@mantine/modals' {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}

export default App;
