import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Games from "./pages/Games/Games";
import Standings from "./pages/Standings/Standings";
import Teams from "./pages/Teams/Teams";
import Players from "./pages/Players/Players";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route index element={<Navigate to="/games" replace />} />
          <Route path="games" element={<Games />} />
          <Route path="standings" element={<Standings />} />
          <Route path="teams" element={<Teams />} />
          <Route path="players" element={<Players />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;