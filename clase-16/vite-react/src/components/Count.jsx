import { useEffect, useState } from "react";

export const Count = ({ start = 0 }) => {
  const [count, setCount] = useState(start);
  const [button, setButton] = useState({});

  useEffect(() => {
    if (count == 10) {
      setButton({
        backgroundColor: "green",
      });
    }
  }, [count]);

  return (
    <button style={button} onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
  );
};
