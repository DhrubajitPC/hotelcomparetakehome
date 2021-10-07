import React, { FC } from "react";
import { useComparisons } from "../../hooks";

type Props = {
  hotelId: number;
};



const ComparePrices: FC<Props> = ({ hotelId }) => {
  const comparisons = useComparisons(hotelId);
  return comparisons.length > 0 ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h4>The Competition</h4>
      {comparisons.map((c) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p>{c.name}</p>
            <p>
              {c.currency} {c.price}
            </p>
          </div>
        );
      })}
    </div>
  ) : null;
};

export default ComparePrices;
