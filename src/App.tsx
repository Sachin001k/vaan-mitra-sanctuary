import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RaptorPage from "./pages/RaptorPage";
import MapsPage from "./pages/MapsPage";
import ImpactPage from "./pages/ImpactPage";
import PhotographyPage from "./pages/PhotographyPage";
import BlogPage from "./pages/BlogPage";
import DonatePage from "./pages/DonatePage";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import AdminPage from "./pages/AdminPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/raptor" element={<RaptorPage />} />
          <Route path="/maps" element={<MapsPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/photography" element={<PhotographyPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
