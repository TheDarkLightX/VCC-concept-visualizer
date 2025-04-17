// client/src/App.tsx

import { Switch, Route, Link, Router as WouterRouter } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

import Home from "@/pages/Home";
import TEECExplainer from "@/pages/TEECExplainer";
import TauImplementation from "@/pages/TauImplementation";
import FormulasPage from "@/pages/FormulasPage";
import NotFound from "@/pages/not-found";
import VCCLogo from "@/components/VCCLogo";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 
        This Router base tells Wouter to drop the GitHub‑Pages subpath
        ("/VCC-concept-visualizer/") before matching your "/" and "/tau" routes
      */}
      <WouterRouter base={import.meta.env.BASE_URL}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/">
                <VCCLogo size={40} className="hover:opacity-80 transition" />
              </Link>
              <span className="font-bold text-xl">VCC Concept</span>
            </div>
            <div className="space-x-6">
              <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
              <Link href="/teec" className="hover:text-blue-300 transition-colors">TEEC Explainer</Link>
              <Link href="/tau" className="hover:text-blue-300 transition-colors">Tau Implementation</Link>
              <Link href="/formulas" className="hover:text-blue-300 transition-colors">Formulas</Link>
            </div>
          </div>
        </nav>

        <Switch>
          <Route path="/" component={Home} />
          <Route path="/teec" component={TEECExplainer} />
          <Route path="/tau" component={TauImplementation} />
          <Route path="/formulas" component={FormulasPage} />
          <Route component={NotFound} />
        </Switch>
      </WouterRouter>

      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

