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
      {loading ? (
        <h4>Please wait while we load the data...</h4>
      ) : (
        hotels.map((h) => <HotelInfo {...h} key={h.id} />)
      )}
    </>
  );
};

export default HotelsList;
