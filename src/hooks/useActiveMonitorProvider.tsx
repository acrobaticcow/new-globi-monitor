import { createContext, useMemo, useReducer } from "react";
import { produce } from "immer";

export type MiniMonitorContextType = {
  activeMiniMonitorIds: string[];
};
export type MonitorContextType = {
  activeMonitorIds: string[];
};
export interface ActiveMonitorsApiContextType {
  onAddMiniMonitorIds: (id: string) => void;
  onAddMonitorIds: (id: string) => void;
}
interface ActiveMonitorsProviderProps {
  children: any;
}

export const MiniMonitorContext = createContext<MiniMonitorContextType | null>(
  null
);
export const MonitorContext = createContext<MonitorContextType | null>(null);

export const ActiveMonitorsApiContext =
  createContext<ActiveMonitorsApiContextType | null>(null);

interface State {
  activeMiniMonitorIds: string[];
  activeMonitorIds: string[];
}
enum ActionKind {
  addMiniMonitorId = "addMiniMonitorIds",
  addMonitorId = "addMonitorIds",
}
type Action =
  | { type: ActionKind.addMiniMonitorId; payload: string }
  | { type: ActionKind.addMonitorId; payload: string };

const reducer = produce((state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case ActionKind.addMiniMonitorId:
      if (state.activeMiniMonitorIds.includes(payload)) return state;
      if (state.activeMiniMonitorIds.length < 2) {
        state.activeMonitorIds.push(payload);
      }
      state.activeMiniMonitorIds.push(payload);
      return state;
    case ActionKind.addMonitorId:
      if (state.activeMonitorIds.includes(payload)) return state;
      state.activeMonitorIds.push(payload);
      return state;
    default:
      return state;
  }
});

export const ActiveMonitorsProvider = ({
  children,
}: ActiveMonitorsProviderProps) => {
  const [{ activeMiniMonitorIds, activeMonitorIds }, dispatch] = useReducer(
    reducer,
    {
      activeMiniMonitorIds: [],
      activeMonitorIds: [],
    }
  );
  const api = useMemo(() => {
    const onAddMiniMonitorIds = (id: string) => {
      dispatch({ type: ActionKind.addMiniMonitorId, payload: id });
      // if (activeMiniMonitorIds.length < 2) {
      //   dispatch({ type: ActionKind.addMonitorId, payload: id });
      // }
    };
    const onAddMonitorIds = (id: string) => {
      dispatch({ type: ActionKind.addMonitorId, payload: id });
    };
    return { onAddMiniMonitorIds, onAddMonitorIds };
  }, []);

  return (
    <ActiveMonitorsApiContext.Provider value={api}>
      <MonitorContext.Provider value={{ activeMonitorIds }}>
        <MiniMonitorContext.Provider value={{ activeMiniMonitorIds }}>
          {children}
        </MiniMonitorContext.Provider>
      </MonitorContext.Provider>
    </ActiveMonitorsApiContext.Provider>
  );
};
