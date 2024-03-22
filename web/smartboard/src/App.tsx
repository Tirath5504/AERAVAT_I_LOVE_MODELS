import { BrowserRouter, Routes, Route } from "react-router-dom";
import Room from "./Room";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/room/:id" element={< Room />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;