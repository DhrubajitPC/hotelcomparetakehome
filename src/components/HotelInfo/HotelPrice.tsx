import { FC } from "react";
import { useAppContext } from "../../state/Context";
import TaxBreakdown from "../TaxBreakdown";
import Tooltip from "../Tooltip";
import { usePriceBreakdown } from "./hooks";
import { formatPrice } from "./utils";

const HotelPrice: FC<{ hotelId: number }> = ({ hotelId }) => {
  const { state } = useAppContext();
  const currency = state.selectedCurrency;
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
      <p style={{ textDecoration: "underline" }}>
        {showCurrency && currency} {price}*
      </p>
    </Tooltip>
  ) : (
    <p>
      {showCurrency && currency} {price}
    </p>
  );
};

export default HotelPrice;
