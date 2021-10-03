import React, { FC } from "react";
import { Hotel } from "../../state/types";
import TaxBreakdown from "../TaxBreakdown";
import Tooltip from "../Tooltip";

export type Props = {
  onBook: () => void;
  price: number;
  currency: string;
} & Omit<Hotel, "id">;

const HotelInfo: FC<Props> = ({
  address,
  description,
  name,
  photo,
  rating,
  stars,
  price,
  currency,
  onBook,
  children,
}) => (
  <>
    <div
      style={{
        display: "flex",
        justifyContent: "left",
      }}
    >
      <div>
        <img alt="hotel" src={photo} />
      </div>
      <div
        style={{
          marginRight: "auto",
        }}
      >
        <h3>{name}</h3>
        <p>{address}</p>
        <div dangerouslySetInnerHTML={{ __html: description }} />
        <button onClick={onBook}>Book!</button>
      </div>
      <div>
        <p>{stars} star Hotel</p>
        <p>Rating {rating}</p>
        <Tooltip body={<TaxBreakdown tax={0} hotelFees={0} />}>
          <p>
            {currency} {price}
          </p>
        </Tooltip>
      </div>
    </div>
    {children && <div>{children}</div>}
  </>
);

export default HotelInfo;
