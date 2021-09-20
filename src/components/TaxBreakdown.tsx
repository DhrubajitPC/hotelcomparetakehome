import React, { FC } from "react";

type Props = {
  tax: number;
  hotelFees: number;
};

const TaxBreakdown: FC<Props> = ({ tax, hotelFees }) => (
  <>
    <p>Tax: {tax}</p>
    <p>Hotel Fees: {hotelFees}</p>
  </>
);

export default TaxBreakdown;
