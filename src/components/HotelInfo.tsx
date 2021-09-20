import React, { FC } from "react";
import { Hotel } from "../state/types";

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
  onBook,
  price,
  currency,
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
        <p>
          {currency} {price}
        </p>
      </div>
    </div>
    {children && <div>{children}</div>}
  </>
);

export default HotelInfo;
