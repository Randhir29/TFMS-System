import { Button } from "@chakra-ui/react";
import { useRef } from "react";
import { useInspectDom } from "../../hooks/useInspectDom";
import { inspectImport } from "../../utils/inspectImport";

// call once after import to inspect module shape
// `@chakra-ui/react` does not provide a default export — use named import
import TFMSTooltip from "./TFMSTooltip";
inspectImport("TFMSTooltip", TFMSTooltip);

export default function InspectorButtonExample() {
  const btnRef = useRef(null);
  useInspectDom(btnRef, "TFMSTooltipRef");

  return (
    <Button ref={btnRef} aria-label="inspect-me">Inspect me</Button>
  );
}
