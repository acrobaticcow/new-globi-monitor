import { createContext, useState } from "react";

export type MiniMonitorContextType = {
  activeMiniMonitorIds: string[];
  addMiniMonitorIds: (id: string) => void;
};
export type MonitorContextType = {
  activeMonitorIds: string[];
  addMonitorIds: (id: string) => void;
};
interface ActiveMonitorsProviderProps {
  children: any;
}

export const MiniMonitorContext = createContext<MiniMonitorContextType | null>(
  null
);
export const MonitorContext = createContext<MonitorContextType | null>(null);

export const ActiveMonitorsProvider = ({
  children,
}: ActiveMonitorsProviderProps) => {
  const [activeMiniMonitorIds, setActiveMiniMonitorIds] = useState<string[]>(
    []
  );
  const [activeMonitorIds, setActiveMonitorIds] = useState<string[]>([]);
  const addMiniMonitorIds = (id: string) => {
    setActiveMiniMonitorIds((draft) => [...draft, id]);
    if (activeMiniMonitorIds.length < 2) {
      setActiveMonitorIds((draft) => [...draft, id]);
    }
  };
  const addMonitorIds = (id: string) => {
    setActiveMonitorIds((draft) => [...draft, id]);
  };

  return (
    <MonitorContext.Provider value={{ addMonitorIds, activeMonitorIds }}>
      <MiniMonitorContext.Provider
        value={{ activeMiniMonitorIds, addMiniMonitorIds }}
      >
        {children}
      </MiniMonitorContext.Provider>
    </MonitorContext.Provider>
  );
};
