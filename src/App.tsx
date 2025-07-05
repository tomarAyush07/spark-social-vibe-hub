import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Landing } from "./pages/Landing";
import { Feed } from "./pages/Feed";
import { Search } from "./pages/Search";
import { Profile } from "./pages/Profile";
import { Notifications } from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/ThemeProvider";
import { RequireAuth } from "./components/RequireAuth";
import Liked from "./pages/Liked";
import Bookmarks from "./pages/Bookmarks";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            {/* Protected routes with layout */}
            <Route element={<Layout />}>
              <Route
                path="/feed"
                element={
                  <RequireAuth>
                    <Feed />
                  </RequireAuth>
                }
              />
              <Route
                path="/search"
                element={
                  <RequireAuth>
                    <Search />
                  </RequireAuth>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route
                path="/notifications"
                element={
                  <RequireAuth>
                    <Notifications />
                  </RequireAuth>
                }
              />
              <Route
                path="/liked"
                element={
                  <RequireAuth>
                    <Liked />
                  </RequireAuth>
                }
              />
              <Route
                path="/bookmarks"
                element={
                  <RequireAuth>
                    <Bookmarks />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
