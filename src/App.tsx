import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Directory from "./pages/Directory";
import ScoreMatcher from "./pages/ScoreMatcher";
import Compare from "./pages/Compare";
import FAQ from "./pages/FAQ";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="directory" element={<Directory />} />
          <Route path="matcher" element={<ScoreMatcher />} />
          <Route path="compare" element={<Compare />} />
          <Route path="faq" element={<FAQ />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
