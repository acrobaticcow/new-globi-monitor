import SideBar from "./components/Sidebar/Sidebar";
import MiniMonitors from "./components/MiniMonitor/MiniMonitorsContainer";
import { ActiveMonitorsProvider } from "./hooks/useActiveMonitorProvider";
import { fetchAuth } from "./api/auth.api";
import { useQuery } from "@tanstack/react-query";
import MainMonitorsContainer from "./components/MainMonitor/MainMonitorContainer";

function App() {
  const { data: user } = useQuery({
    queryKey: ["auth"],
    queryFn: fetchAuth,
  });
  return (
    <ActiveMonitorsProvider>
      <div className="w-full bg-neutral-600 pl-14">
        <SideBar />
        <div className="h-screen w-full">
          <MainMonitorsContainer />
          <MiniMonitors />
        </div>
      </div>
    </ActiveMonitorsProvider>
  );
}

export default App;
