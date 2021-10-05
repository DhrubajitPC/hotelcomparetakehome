import React, { FC } from "react";
import { useAppContext } from "../../state/Context";
import HotelInfo from "../HotelInfo";

const HotelsList: FC = () => {
  const { state } = useAppContext();
  return (
    <>
      {!state.loading.hotel &&
        state.hotels.map((h, idx) => (
          <HotelInfo
            onBook={() => {}}
            currency={""}
            {...h}
            price={212}
            key={idx}
          />
        ))}
    </>
  );
};

export default HotelsList;
