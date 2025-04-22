import { Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import CirclekPage from "./page/CirclekPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/circlek" element={<CirclekPage />} />
      </Routes>
    </>
  );
}

export default App;
