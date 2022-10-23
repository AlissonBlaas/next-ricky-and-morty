import React from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

interface TProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Card = ({ children }: TProps) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
