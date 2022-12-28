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
    switch (type) {
        case ActionKind.addMiniMonitorId:
            if (state.activeMiniMonitorIds.includes(payload))
                return state;
            if (state.activeMiniMonitorIds.length < 2) {
                state.activeMonitorIds.push(payload);
            }
            state.activeMiniMonitorIds.push(payload);
            return state;
        case ActionKind.addMonitorId:
            if (state.activeMonitorIds.includes(payload))
                return state;
            state.activeMonitorIds.push(payload);
            return state;
        case ActionKind.delMiniMonitorId:
            state.activeMiniMonitorIds =
                state.activeMiniMonitorIds.filter(
                    (id) => id !== payload
                );
            state.activeMonitorIds = state.activeMonitorIds.filter(
                (id) => id !== payload
            );
            return state;
        case ActionKind.delMonitorId:
            state.activeMonitorIds = state.activeMonitorIds.filter(
                (id) => id !== payload
            );
            return state;
        default:
            return state;
    }
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
