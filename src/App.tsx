import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TestPreparePage from "./pages/TestPreparePage";
import TestProgressPage from "./pages/TestProgressPage";
import TestResultPage from "./pages/TestResultPage";
import Header from "./components/Common/Header";
import { AnimatePresence } from "framer-motion";

function App() {
  const [id, setId] = useState<number[] | undefined>([]);

  return (
    <>
      <Header />
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test/prepare" element={<TestPreparePage />} />
          <Route
            path="/test/progress"
            element={<TestProgressPage setId={setId} />}
          />
          <Route path="/test/result" element={<TestResultPage id={id} />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
