import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CountryPage } from '../pages';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<CountryPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};
