import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load pages for better performance
const Login = lazy(() => import("./pages/login"));
const Cart = lazy(() => import("./pages/cart"));
const Profile = lazy(() => import("./pages/profile"));
const PersonalInfo = lazy(() => import("./pages/profile/personal-info"));
const ChangePassword = lazy(() => import("./pages/profile/change-password"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/personal-info" element={<PersonalInfo />} />
          <Route path="/profile/change-password" element={<ChangePassword />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
