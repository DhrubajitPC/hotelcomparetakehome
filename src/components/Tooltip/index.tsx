import React, { FC, ReactElement, useState } from "react";
import styles from "./styles.module.css";

type Props = {
  body: ReactElement;
};

const Tooltip: FC<Props> = ({ body, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      data-testid="tooltip-container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{
        position: "relative",
        cursor: "help",
      }}
    >
      {children}
      {showTooltip && <div className={styles.body}>{body}</div>}
    </div>
  );
};

export default Tooltip;
