import { useMemo } from "react";

const useBubbleVariant = (text = "", attachments = []) => {
  return useMemo(() => {
    if (text && attachments.length > 1) return "text attachments";
    if (text && attachments.length === 1) return "card";
    if (!text && attachments.length) return "image";
    if (!text && !attachments.length) return "typing";
    return "default";
  }, [text, attachments]);
};

export default useBubbleVariant;
