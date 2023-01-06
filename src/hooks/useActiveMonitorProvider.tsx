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
    onDelMiniMonitorId: (id: string) => void;
    onDelMonitorId: (id: string) => void;
}
interface ActiveMonitorsProviderProps {
    children: any;
}

export const MiniMonitorContext =
    createContext<MiniMonitorContextType | null>(null);
export const MonitorContext =
    createContext<MonitorContextType | null>(null);

export const ActiveMonitorsApiContext =
    createContext<ActiveMonitorsApiContextType | null>(null);

interface State {
    activeMiniMonitorIds: string[];
    activeMonitorIds: string[];
}
enum ActionKind {
    addMiniMonitorId = "addMiniMonitorIds",
    addMonitorId = "addMonitorIds",
    delMonitorId = "delMonitorId",
    delMiniMonitorId = "delMiniMonitorId",
}
type Action =
    | { type: ActionKind.addMiniMonitorId; payload: string }
    | { type: ActionKind.addMonitorId; payload: string }
    | { type: ActionKind.delMiniMonitorId; payload: string }
    | { type: ActionKind.delMonitorId; payload: string };

const reducer = produce((state: State, action: Action): State => {
    const { type, payload } = action;
    const { activeMiniMonitorIds, activeMonitorIds } = state;
    switch (type) {
        case ActionKind.addMiniMonitorId:
            if (activeMiniMonitorIds.includes(payload)) break;
            if (activeMiniMonitorIds.length < 2) {
                activeMonitorIds.push(payload);
            }
            activeMiniMonitorIds.push(payload);
            break;
        case ActionKind.addMonitorId:
            if (activeMonitorIds.includes(payload)) return state;
            activeMonitorIds.push(payload);
            break;
        case ActionKind.delMiniMonitorId: {
            const miniIndex = activeMiniMonitorIds.findIndex(
                (id) => id === payload
            );
            if (miniIndex !== -1)
                activeMiniMonitorIds.splice(miniIndex, 1);
            const index = activeMonitorIds.findIndex(
                (id) => id === payload
            );
            if (index !== -1) activeMonitorIds.splice(index, 1);
            break;
        }
        case ActionKind.delMonitorId:
            const index = activeMonitorIds.findIndex(
                (id) => id === payload
            );
            if (index !== -1) activeMonitorIds.splice(index, 1);
            break;
        default:
            break;
    }
    return state;
});

export const ActiveMonitorsProvider = ({
    children,
}: ActiveMonitorsProviderProps) => {
    const [{ activeMiniMonitorIds, activeMonitorIds }, dispatch] =
        useReducer(reducer, {
            activeMiniMonitorIds: [],
            activeMonitorIds: [],
        });
    const api = useMemo(() => {
        const onAddMiniMonitorIds = (id: string) => {
            dispatch({
                type: ActionKind.addMiniMonitorId,
                payload: id,
            });
        };
        const onAddMonitorIds = (id: string) => {
            dispatch({ type: ActionKind.addMonitorId, payload: id });
        };
        const onDelMiniMonitorId = (id: string) => {
            dispatch({
                type: ActionKind.delMiniMonitorId,
                payload: id,
            });
        };
        const onDelMonitorId = (id: string) => {
            dispatch({ type: ActionKind.delMonitorId, payload: id });
        };
        return {
            onAddMiniMonitorIds,
            onAddMonitorIds,
            onDelMiniMonitorId,
            onDelMonitorId,
        };
    }, []) as ActiveMonitorsApiContextType;

    return (
        <ActiveMonitorsApiContext.Provider value={api}>
            <MonitorContext.Provider value={{ activeMonitorIds }}>
                <MiniMonitorContext.Provider
                    value={{ activeMiniMonitorIds }}
                >
                    {children}
                </MiniMonitorContext.Provider>
            </MonitorContext.Provider>
        </ActiveMonitorsApiContext.Provider>
    );
};
