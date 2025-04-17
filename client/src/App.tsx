import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import TEECExplainer from "@/pages/TEECExplainer";

function Router() {
  return (
    <>
      <nav className="bg-gray-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
          <span className="font-bold text-xl">VCC Concept</span>
          <div className="space-x-6">
            <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
            <Link href="/teec" className="hover:text-blue-300 transition-colors">TEEC Explainer</Link>
          </div>
        </div>
      </nav>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/teec" component={TEECExplainer} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
