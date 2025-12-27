import { useToast } from "@chakra-ui/react";

export default function useTfmToast() {
  const toast = useToast();

  const success = (title, opts = {}) =>
    toast({
      title,
      status: "success",
      duration: opts.duration || 5000,
      isClosable: true,
      position: opts.position || "top-right",
      // Use TFMS LPG primary token via CSS variable
      render: ({ id }) => (
        (document && document.createElement) ? null : null // placeholder for SSR safety
      ),
      ...opts,
      // styling via CSS variables (theme tokens)
      style: {
        backgroundColor: "var(--chakra-colors-lpg-primary)",
        color: "white",
        borderRadius: 8,
        padding: "12px 16px",
        ...opts.style,
      },
    });

  const error = (title, opts = {}) =>
    toast({
      title,
      status: "error",
      duration: opts.duration || 7000,
      isClosable: true,
      position: opts.position || "top-right",
      style: {
        backgroundColor: "var(--chakra-colors-lpg-alarmHigh)",
        color: "white",
        borderRadius: 8,
        padding: "12px 16px",
        ...opts.style,
      },
      ...opts,
    });

  const info = (title, opts = {}) =>
    toast({
      title,
      status: "info",
      duration: opts.duration || 5000,
      isClosable: true,
      position: opts.position || "top-right",
      style: {
        backgroundColor: "var(--chakra-colors-lpg-background)",
        color: "inherit",
        borderRadius: 8,
        padding: "12px 16px",
        ...opts.style,
      },
      ...opts,
    });

  return { success, error, info };
}
