import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { BookingProvider } from '@shared/store/BookingProvider';
import { appRoutes } from '../routes';

const router = createBrowserRouter(appRoutes);

export function App() {
  return (
    <BookingProvider>
      <RouterProvider router={router} />
    </BookingProvider>
  );
}
