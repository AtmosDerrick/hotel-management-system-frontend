import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import Layout from "./asset/Layout";
import Register from "./pages/Register";
import AccountPage from "./pages/ProfilePage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import SinglePlacePage from "./pages/SinglePlacePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";

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
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<SinglePlacePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
