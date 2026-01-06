import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";

// Pages
import Splash from "@/pages/Splash";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Tasks from "@/pages/Tasks";
import Reflection from "@/pages/Reflection";
import Journal from "@/pages/Journal";
import Stories from "@/pages/Stories";
import Profile from "@/pages/Profile";
import Streak from "@/pages/Streak";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="bg-[#021E12] min-h-screen text-white">
      <Switch>
        <Route path="/" component={Splash} />
        <Route path="/login" component={Login} />
        
        {/* Main App Routes with Navbar */}
        <Route path="/dashboard">
          <Navbar />
          <Dashboard />
        </Route>
        <Route path="/tasks">
          <Navbar />
          <Tasks />
        </Route>
        <Route path="/reflection">
          <Navbar />
          <Reflection />
        </Route>
        <Route path="/journal">
          <Navbar />
          <Journal />
        </Route>
        <Route path="/stories">
          <Navbar />
          <Stories />
        </Route>
        <Route path="/profile">
          <Navbar />
          <Profile />
        </Route>
        <Route path="/streak">
          <Navbar />
          <Streak />
        </Route>

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Toaster />
        <Router />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
