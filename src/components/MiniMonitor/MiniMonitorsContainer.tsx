import { FC } from "react";
import {
  MiniMonitorContext,
  MiniMonitorContextType,
} from "../../hooks/useActiveMonitorProvider";
import { useContext } from "react";
import MiniMonitor from "./MiniMonitor";
import { useSelectFollowers } from "../../api/hooks/useFetchPatients";

interface MiniMonitorsProps {}

const MiniMonitorsContainer: FC<MiniMonitorsProps> = () => {
  const { activeMiniMonitorIds } = useContext(
    MiniMonitorContext
  ) as MiniMonitorContextType;
  const { data } = useSelectFollowers(activeMiniMonitorIds);

  return (
    <div className="grid h-2/5 w-full grid-cols-12 bg-neutral-600">
      <div className="col-span-3 flex h-full items-center justify-center bg-biloba-flower-500">
        Thông tin
      </div>
      <div className="col-span-9 grid h-full auto-cols-[25%] grid-flow-col grid-rows-2 overflow-scroll px-2">
        {data?.map(
          ({ patient_detail: { patient_name, dob, image, patient_id } }) => (
            <MiniMonitor
              name={patient_name}
              dob={dob}
              img={image}
              key={patient_id}
              id={patient_id}
            />
          )
        )}
      </div>
    </div>
  );
};

export default MiniMonitorsContainer;
