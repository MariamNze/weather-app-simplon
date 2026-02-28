import { useClock } from "../hooks/useClock";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData }) => {
  const currentTime = useClock();

  if (!weatherData) return null;

  const weekday = currentTime.toLocaleDateString("en-GB", {
    weekday: "long",
  });

  const time = currentTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className={styles.wrapper}>
      <h2>
        {`${weekday} ${time}`}
      </h2>
    </div>
  );
};
