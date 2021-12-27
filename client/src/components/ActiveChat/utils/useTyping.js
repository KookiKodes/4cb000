import { useState, useRef, useEffect, useCallback } from "react";

// helpers
import { alertTyping } from "../../../store/utils/thunkCreators";

const useTyping = (id, isActive = false, delay = 500) => {
  const [text, setText] = useState("");
  const typingRef = useRef(null);

  const updateTyping = useCallback(
    (value = "") => {
      if (!typingRef.current && isActive) {
        alertTyping(id, true);
      }
      setText(value);
    },
    [id, isActive]
  );

  const resetTyping = useCallback(
    (full = false) => {
      if (full) setText("");
      if (isActive) alertTyping(id);
      typingRef.current = null;
    },
    [id, isActive]
  );

  useEffect(() => {
    if (isActive) {
      typingRef.current = setTimeout(resetTyping, delay);
      return () => clearTimeout(typingRef.current);
    }
  }, [delay, text, resetTyping, isActive]);

  return [text, { updateTyping, resetTyping }];
};

export default useTyping;
