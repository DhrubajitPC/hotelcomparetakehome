import React, { FC } from "react";
import { useComparisons } from "../../hooks";
import styles from "./styles.module.css";

type Props = {
  hotelId: number;
};

const ComparePrices: FC<Props> = ({ hotelId }) => {
  const comparisons = useComparisons(hotelId);
  return comparisons.length > 0 ? (
    <div className={styles.container}>
      <h4>The Competition</h4>
      {comparisons.map((c, idx) => {
        return (
          <div key={c.name} className={styles.comparisonItem}>
            <p>{c.name}</p>
            <p className={c.name !== "Us" && idx === comparisons.length - 1? styles.strikeThrough : ""}>
              {c.currency} {c.price}
            </p>
          </div>
        );
      })}
    </div>
  ) : null;
};

export default ComparePrices;
