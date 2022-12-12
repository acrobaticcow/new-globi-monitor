import { FC, useContext } from "react";
import { useSelectFollowers } from "../../api/hooks/useFetchPatients";
import {
  MonitorContext,
  MonitorContextType,
} from "../../hooks/useActiveMonitorProvider";
import MainMonitor from "./MainMonitor";

interface MainMonitorsContainerProps {}

const MainMonitorsContainer: FC<MainMonitorsContainerProps> = () => {
  const { activeMonitorIds } = useContext(MonitorContext) as MonitorContextType;
  const { data } = useSelectFollowers(activeMonitorIds);

  return (
    <div className="flex h-3/5 w-full gap-6 overflow-x-scroll">
      {data?.map(
        ({
          patient_detail: { dob, phone, patient_name, gender, patient_id },
        }) => (
          <MainMonitor
            dob={dob}
            phone={phone}
            gender={gender}
            name={patient_name}
            key={patient_id}
            patient_id={patient_id}
          />
        )
      )}
    </div>
  );
};

export default MainMonitorsContainer;
