import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider } from "./features/auth/context/auth-provider";
import { AppRouter } from "./app/router";


function App() {

  return (
    <TooltipProvider delayDuration={0}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </TooltipProvider>
  )
}

export default App