import { FC } from "react";
import { useAppContext } from "../../state/Context";
import { formatPrice } from "../../utils";
import TaxBreakdown from "../TaxBreakdown";
import Tooltip from "../Tooltip";
import { usePriceBreakdown } from "./hooks";

const HotelPrice: FC<{ hotelId: number }> = ({ hotelId }) => {
  const {
    state: { selectedCurrency: currency },
  } = useAppContext();
  const priceBreakdown = usePriceBreakdown(hotelId);

  const isTaxInclusive = Boolean(priceBreakdown.hotelFees);
  const showCurrency = priceBreakdown.totalPrice !== "Rates Unavailable";

  let price;
  if (showCurrency) {
    price = formatPrice(currency, priceBreakdown.totalPrice as number);
  } else {
    price = priceBreakdown.totalPrice;
  }

  return isTaxInclusive ? (
    <Tooltip
      body={
        <TaxBreakdown
          tax={priceBreakdown.tax!}
          hotelFees={priceBreakdown.hotelFees!}
        />
      }
    >
      <button onClick={() => {}}>Book!</button>
      <p style={{ textDecoration: "underline" }}>
        {showCurrency && currency} {price}*
      </p>
    </Tooltip>
  ) : (
    <>
      <button onClick={() => {}}>Book!</button>
      <p>
        {showCurrency && currency} {price}
      </p>
    </>
  );
};

export default HotelPrice;
