// src/components/examples/ExampleUsage.jsx
import { IconButton } from "@chakra-ui/react";
import { LuPencil } from "react-icons/lu";
import TFMSTooltip from "../TFMSTooltip";

export default function ExampleUsage({ placement = "right" }) {  

  return (
    <div style={{ padding: 32 }}>
  <TFMSTooltip 
  label="Edit this tank"
  placement="right"
  colorScheme="brand"
  size="sm"
  offset={{ x: 0, y: 0 }}
  contentProps={{
    className: "tfms-tooltip",
    style: {
      /* 3D visibility FIX — REQUIRED for rotateZ */
      transform: "rotateZ(0deg)",
      transformOrigin: "left center",
      backfaceVisibility: "visible",
    }
  }}
  arrowProps={{
    style: {
      /* Disable ALL Chakra internal arrow background logic */
      "--arrow-background": "none !important",
      /* Disable Chakra inline background */
      background: "none !important",
      /* Disable Chakra inline border */
      border: "none !important",
    }
  }}
>
        <IconButton
        aria-label="edit"
        color="white" >{<LuPencil  size={24}/>}</IconButton>
      </TFMSTooltip>
    </div>
  );
}
