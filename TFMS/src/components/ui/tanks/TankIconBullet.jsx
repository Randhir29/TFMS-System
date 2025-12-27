import { Box, Flex, Image, Text } from "@/components/ui/primitives/Primitives.jsx";
import { useRecipe } from "@chakra-ui/react";
import { useCallback } from "react";
import tankIconRecipe from "./tankIcon.recipe";

export default function TankIconBullet({
  tankId,
  levelPercent = 0,
  alarmState = null,
  size = "md",
  onClick,
  ariaLabel = "Tank",
  companyLogoSrc,
}) {
  const recipe = useRecipe({ recipe: tankIconRecipe });
  const styles = recipe({ size });

  const normalized = Math.max(0, Math.min(100, Number(levelPercent || 0)));

  // Map alarm state to TFMS color CSS variables (no useTheme lookup)
  const colorVar = (() => {
    if (alarmState === "LL" || alarmState === "LLL")
      return "var(--chakra-colors-lpg-alarmLow)";
    if (alarmState === "HH" || alarmState === "HHH")
      return "var(--chakra-colors-lpg-alarmHigh)";
    return "var(--chakra-colors-lpg-primary)";
  })();

  const onKey = useCallback(
    (e) => {
      if (!onClick) return;
      if (e.key === "Enter" || e.key === " ") onClick(e);
    },
    [onClick]
  );

  return (
    <Box
      as="button"
      type="button"
      aria-label={ariaLabel}
      data-tank-id={tankId}
      onClick={onClick}
      onKeyDown={onKey}
      tabIndex={0}
      css={styles}
      data-part="tank-root"
      style={{ position: "relative", appearance: "none", border: "none", background: "transparent" }}
    >
      {/* BODY CYLINDER */}
      <Box data-part="body" aria-hidden="true" />

      {/* LEFT CAP */}
      <Box data-part="cap-left" aria-hidden="true" />

      {/* RIGHT CAP */}
      <Box data-part="cap-right" aria-hidden="true" />

      {/* FILL: use inline css width but token color variable for background */}
      <Box
        data-part="fill"
        aria-hidden="true"
        style={{
          width: `${normalized}%`,
          backgroundColor: colorVar,
        }}
      />

      {/* Overlay label: show percentage */}
      <Flex
        align="center"
        justify="center"
        style={{ position: "relative", pointerEvents: "none" }}
      >
        <Text fontSize="xs" color="text" style={{ fontWeight: 600 }}>
          {normalized.toFixed(0)}%
        </Text>
      </Flex>

      {/* Optional company logo small */}
      {companyLogoSrc && (
        <Image
          src={companyLogoSrc}
          alt="company logo"
          style={{ position: "absolute", right: 4, top: 4, width: 28, height: 28 }}
        />
      )}
    </Box>
  );
}
