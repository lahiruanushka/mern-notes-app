import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import NotesPage from "./pages/NotesPage";
import NotFoundPage from "./pages/NotFoundPage";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import NavigationBar from "./components/NavigationBar";
import LoginModal from "./pages/LoginPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <UserProvider>
      <Router>
        <NavigationBar />
        <Routes>
          {/* Unauthenticated routes */}
          <Route element={<UnauthenticatedRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>

          <Route path="/" element={<NotesPage />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
