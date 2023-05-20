import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import Layout from "./asset/Layout";
import Register from "./pages/Register";
import AccountPage from "./pages/ProfilePage";
import axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import SinglePlacePage from "./pages/SinglePlacePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import BookingPage from "./pages/BookingPage";
import BookingsListPage from "./pages/BookingsListPage";
import OwnerLogin from "./pages/ownerPages/OwnerLogin";
import OwnerRegister from "./pages/ownerPages/OwnerRegister";
import UserHistory from "./pages/UserHistory";
import ActiveBookings from "./pages/ActiveBookings";
import UserAccountProfile from "./pages/UserAccountProfile";
import OwnerActiveBookings from "./pages/OwnerActiveBookings";
import FavouritePage from "./pages/FavouritePage";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ownerregister" element={<OwnerRegister />} />

          <Route path="/ownerlogin" element={<OwnerLogin />} />

          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<SinglePlacePage />} />
          <Route path="/account/bookings" element={<BookingsListPage />} />
          <Route
            path="/account/activebookings"
            element={<OwnerActiveBookings />}
          />

          <Route path="/account/bookings/:id" element={<BookingPage />} />
          <Route path="/history" element={<UserHistory />} />
          <Route path="/activebookings" element={<ActiveBookings />} />
          <Route path="/useraccountprofile" element={<UserAccountProfile />} />
          <Route path="/favourite" element={<FavouritePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
