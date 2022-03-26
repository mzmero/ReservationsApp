import React, { useEffect } from 'react';
import './App.scss';
import Explore from './view/pages/explore/explore';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Reservation from "./view/pages/reservations/reservations";
import Favorite from "./view/pages/favorite/favorite";
import Restaurant from "./view/pages/restaurant/restaurant";
import Maps from "./view/pages/maps/maps"
import Admin from './view/pages/admin/admin'
import Restaurateur from './view/pages/restaurateur/restaurateur'
import AddRestaurant from './view/pages/addRestaurant/addRestaurant'
import AddRestaurateur from './view/pages/addRestaurateur/addRestaurateur'
import Profile from './view/pages/profile/profile'
import RestaurateurDashboard from './view/pages/restaurateurDashboard/restaurateurDashboard';
import ViewPage from './view/pages/viewPage/viewPage';
import SearchPage from './view/pages/searchPage/searchPage'
import { SearchResults } from './view/components/searchResults/searchResults';
import { useAppDispatch } from './app/hooks'
import { getAuthentication } from './app/reducers/userReducer'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    function fetchMyAuth() {
      dispatch(getAuthentication())
    }
    fetchMyAuth()
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/viewAll" element={<ViewPage />} />
        <Route path="Reservations" element={<Reservation />} />
        <Route path="Favorite" element={<Favorite />} />
        <Route path="Maps" element={<Maps />} />
        <Route path="Admin" element={<Admin />} />
        <Route path="Restaurateur" element={<Restaurateur />} >
          <Route path=":RestaurantId/:RestaurantName" element={<RestaurateurDashboard />} />
        </Route>
        <Route path="AddRestaurant" element={<AddRestaurant />} />
        <Route path="AddRestaurateur" element={<AddRestaurateur />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Restaurant/:RestaurantId" element={<Restaurant />} />
        <Route path="/search/" element={<SearchPage />} >
          <Route path=":SearchString" element={<SearchResults />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
