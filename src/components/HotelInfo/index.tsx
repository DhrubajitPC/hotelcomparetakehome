import React, { FC } from "react";
import { Hotel } from "../../state/types";
import HotelPrice from "./HotelPrice";
import styles from "./styles.module.css";

export type Props = {
  onBook: () => void;
} & Hotel;

const HotelInfo: FC<Props> = ({
  id,
  address,
  description,
  name,
  photo,
  rating,
  stars,
  onBook,
  children,
}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img alt="hotel" src={photo} />
        </div>
        <div className={styles.body}>
          <h3>{name}</h3>
          <p>{address}</p>
          <div dangerouslySetInnerHTML={{ __html: description }} />
          <button onClick={onBook}>Book!</button>
        </div>
        <div className={styles.review}>
          <h4>Review</h4>
          <p>{stars} ⭐ Hotel</p>
          <p>Rating: {rating}</p>
          <HotelPrice hotelId={id} />
        </div>
      </div>
      {children && <div>{children}</div>}
    </>
  );
};

export default HotelInfo;
