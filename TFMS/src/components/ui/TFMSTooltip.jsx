import { arrow, flip, offset, shift, useFloating } from "@floating-ui/react";
import { cloneElement, useRef, useState } from "react";

export function TFMSTooltip({
  label,
  children,
  offsetValue = 8,
}) {
  const arrowRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, placement } = useFloating({
    open,
    placement: "right",
    middleware: [
      offset(offsetValue),
      flip(),
      shift(),
      arrow({ element: arrowRef })
    ]
  });

  return (
    <>
      {cloneElement(children, {
        ref: refs.setReference,
        onPointerEnter: () => setOpen(true),
        onPointerLeave: () => setOpen(false),
      })}

      {open && (
        <div
          ref={refs.setFloating}
          className="tfms-tooltip"
          data-placement={placement}
          style={{ ...floatingStyles, position: "absolute" }}
        >
          {label}
          <div ref={arrowRef} data-part="arrow">
            <div data-part="arrow-tip" />
          </div>
        </div>
      )}
    </>
  );
}


export default TFMSTooltip;
