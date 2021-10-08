import { FC } from "react";
import { useAppContext } from "../../state/Context";
import { formatPrice } from "../../utils";
import TaxBreakdown from "../TaxBreakdown";
import Tooltip from "../Tooltip";
import { usePriceBreakdown, useSavings } from "./hooks";

const HotelPrice: FC<{ hotelId: number }> = ({ hotelId }) => {
  const {
    state: { selectedCurrency: currency },
  } = useAppContext();
  const priceBreakdown = usePriceBreakdown(hotelId);
  const savings = useSavings(hotelId);

  const isTaxInclusive = Boolean(priceBreakdown.hotelFees);
  const showCurrency = priceBreakdown.totalPrice !== "Rates Unavailable";

  let price;
  if (showCurrency) {
    price = formatPrice(currency, priceBreakdown.totalPrice as number);
  } else {
    price = priceBreakdown.totalPrice;
  }

  return (
    <>
      {isTaxInclusive ? (
        <Tooltip
          body={
            <TaxBreakdown
              tax={priceBreakdown.tax!}
              hotelFees={priceBreakdown.hotelFees!}
            />
          }
        >
          <p style={{ textDecoration: "underline", color: "#eb4d4b" }}>
            {showCurrency && currency} {price}*
          </p>
        </Tooltip>
      ) : (
        <p style={{ color: "#eb4d4b" }}>
          Price: {showCurrency && currency} {price}
        </p>
      )}

      {savings && (
        <p style={{ textTransform: "uppercase", fontSize: "14px" }}>
          you save {savings.toFixed(2)}%
        </p>
      )}
      <button
        style={{
          padding: "20px",
          background: "#4834d4",
          border: "none",
          borderRadius: "10px",
          fontSize: "18px",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={() => {}}
      >
        Book!
      </button>
    </>
  );
};

export default HotelPrice;
