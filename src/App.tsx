import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./presentation/pages/Dashboard";
import { TemplateEditor } from "./presentation/pages/TemplateEditor";
import { FormFiller } from "./presentation/pages/FormFiller";
import { Toaster as HotToaster } from "react-hot-toast";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/editor/new" element={<TemplateEditor />} />
        <Route path="/editor/:id" element={<TemplateEditor />} />
        <Route path="/fill/:id" element={<FormFiller />} />
      </Routes>
      <HotToaster
        toastOptions={{
          className:
            "bg-base-200 border border-base-300 text-base-content rounded-box shadow-2xl font-bold",
          duration: 3000,
        }}
      />
    </Router>
  );
}

export default App;
