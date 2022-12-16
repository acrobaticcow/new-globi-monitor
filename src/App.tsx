import SideBar from "./components/Sidebar/Sidebar";
import MiniMonitors from "./components/MiniMonitor/MiniMonitorsContainer";
import { ActiveMonitorsProvider } from "./hooks/useActiveMonitorProvider";
import MainMonitorsContainer from "./components/MainMonitor/MainMonitorContainer";
import { useFetchUser } from "./api/hooks/useFetchUser";
import { SocketProvider } from "./hooks/useSocketProvider";

function App() {
  const { data: user } = useFetchUser();
  return (
    <SocketProvider>
      <ActiveMonitorsProvider>
        <div className="w-full bg-neutral-600 pl-14">
          <SideBar />
          <div className="h-screen w-full">
            <MainMonitorsContainer />
            <MiniMonitors />
          </div>
        </div>
      </ActiveMonitorsProvider>
    </SocketProvider>
  );
}

export default App;
