import React, { FC } from "react";
import { useComparisons } from "../../hooks";
import { Hotel } from "../../state/types";
import ComparePrices from "../ComparePrices";
import HotelPrice from "../HotelPrice";
import styles from "./styles.module.css";

const HotelInfo: FC<Hotel> = ({
  id,
  address,
  description,
  name,
  photo,
  rating,
  stars,
}) => {
  const showHr = useComparisons(id).length > 0;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img alt="hotel" src={photo} />
        </div>
        <div className={styles.body}>
          <h3>{name}</h3>
          <p>
            <em>Address:</em> {address}
          </p>
          <div dangerouslySetInnerHTML={{ __html: description }} />
          {showHr && <hr />}
          <ComparePrices hotelId={id} />
        </div>
        <div className={styles.review}>
          <h4>Review</h4>
          <p>{stars} ⭐ Hotel</p>
          <p>Rating: {rating}</p>
          <HotelPrice hotelId={id} />
        </div>
      </div>
      {/* {children && <div>{children}</div>} */}
    </>
  );
};

export default HotelInfo;
