import React, { FC } from "react";
import { useAppContext } from "../../state/Context";
import HotelInfo from "../HotelInfo";
import { orderHotelsbyPriceAvailability } from "./utils";

const HotelsList: FC = () => {
  const { state } = useAppContext();
  const hotels = orderHotelsbyPriceAvailability(state.hotels, state.prices);
  const loading = state.loading.hotels === "REQUEST";

  return (
    <>
      {!loading &&
        hotels.map((h) => <HotelInfo onBook={() => {}} {...h} key={h.id} />)}
    </>
  );
};

export default HotelsList;
