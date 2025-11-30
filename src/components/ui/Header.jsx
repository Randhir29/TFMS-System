// src/ui/Header.jsx
// ============================================================================
// PURPOSE OF THIS FILE
// ----------------------------------------------------------------------------
// This file defines the **application-wide top brand bar**, rendered on EVERY
// page above the Sidebar and main content.
//
// It is NOT a navigation element (Sidebar is <nav>). This component uses:
//    - Chakra UI v3 primitives
//    - Semantic <header>
//    - Sticky positioning
//    - TFMS branding, animated gradient title
//    - Avatar + Logout button with custom tooltip
//    - Mobile: exposes a Drawer.Trigger for SidebarMobile
//
// COMMENTING STANDARD:
//    - Every variable, state, JSX block, and function has detailed comments.
//    - Focus on workflow, rationale, and behavior.
// ============================================================================


import { Avatar, Box, Button, Flex, Heading, Icon, IconButton, Image, Spacer, useBreakpointValue, useToken } from '@chakra-ui/react';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import HPCLLogo from '../../assets/HPCL_logo.jpg';
import TFMSTooltip from './TFMSTooltip';

// ============================================================================
// MAIN COMPONENT — Header
// ----------------------------------------------------------------------------
// PARAMETERS:
//   onMobileMenuOpen (function) → triggers SidebarMobile Drawer on small screens.
//
// RETURNS:
//   <header> element containing branding, logo, title, avatar, logout button,
//   and optional mobile menu trigger.
//
// WORKFLOW:
//   - Desktop: shows logo, animated TFMS title, avatar, logout.
//   - Mobile: also shows hamburger icon to open SidebarMobile.
//   - This header is sticky and always visible.
// ============================================================================

function Header({ onMobileMenuOpen }) {
  const [modernG] = useToken('gradients', ['modernG']);

  // Determine if screen is mobile. Used to conditionally show hamburger button.
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });
console.log(isMobile)
  const name = "Admin";

  if (isMobile) {
    return (
      <Box
        as="header"
        position="sticky"
        top="0"
        zIndex="1100"
        width="full"
        bg="gray.100"
        shadow="glow"
        borderBottom="2px solid"
        borderColor="gray.400"
        boxShadow="0 4px 12px rgba(2,6,23,0.2)"
      >
      <Flex
        align="center"
        height="60px"
        px="4"
        gap="4"
        w="100%"
      >
        {/* Mobile Hamburger Trigger */}
        <Button
          aria-label="Open menu"
          size="lg"
          variant="none"
          color="brand.500"
          onClick={onMobileMenuOpen}
        >
          <Icon as={FiMenu} boxSize={7}/>
        </Button>

        {/* HPCL Logo */}
        <Image
          src={HPCLLogo}
          alt="HPCL"
          boxSize="50px"
          flex="0 0 auto"
          p="2px"
          objectFit="contain"
        />

        {/* Center text */}
        <Flex flex="1" justify="center" pointerEvents="none">
          <Heading
            as="h1"
            textStyle="subheading"
             backgroundImage={modernG}
             bgSize="200% 100%"
            bgRepeat="no-repeat"
            bgClip="text"
            color="transparent"
            className="gradientText"
            userSelect="none"
          >
            TFMS
          </Heading>
        </Flex>

        {/* Avatar + Logout */}
        <Flex align="center" gap="3">
          <Avatar.Root size="lg" borderWidth="2px" borderColor="brand.500">
            <Avatar.Fallback>{name[0]}</Avatar.Fallback>
          </Avatar.Root>

          <TFMSTooltip label="Logout" placement="bottom" delay={200}>
            <IconButton
              aria-label="Logout"
              size="lg"
              variant="ghost"
              onClick={() => {
                try {
                  console.log("[DEBUG] Logout clicked");
                } catch (err) {
                  console.error("Logout error:", err);
                }
              }}
            >
              <FiLogOut />
            </IconButton>
          </TFMSTooltip>
        </Flex>
      </Flex>
      </Box>
    );
  }

  // ===========================
  // DESKTOP / DEFAULT LAYOUT
  // ===========================
  return (
    <Box
        as="header"
        position="sticky"
        top="0"
        zIndex="1100"
        p="5px" 
        width="full"
        bg="gray.100"               // background
        shadow="glow"
        borderBottom="2px solid"
        borderColor="gray.400"
        boxShadow="0 4px 12px rgba(2,6,23,0.2)"
      >
        <Flex
          alignItems="center"
          w="100%"
        >
          <Image
            src={HPCLLogo}
            alt="HPCL"
            boxSize="60px"
            flex="0 0 auto"
            p="2px"
            ml={3}
            objectFit="contain"
          />

          <Heading
            as="h1"
            textStyle="headline"
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
            zIndex={1}
            backgroundImage={modernG}
            bgSize="200% 100%"
            bgRepeat="no-repeat"
            bgClip="text"
            color="transparent"
            className="gradientText"
          >
            TFMS
          </Heading>

          <Spacer />

          <Flex align="center" pr={3}>
            <Avatar.Root size="xl" 
              mr={1} 
              shape="full"
              bg="brand.600"
              color="white"
              borderWidth="3px"
              borderColor="brand.300"
              shadow="sm"
              _hover={{
              shadow: "lg",
              borderColor: "brand.600",
              }} 
            >
              <Avatar.Fallback>{ name[0] }</Avatar.Fallback>
            </Avatar.Root>  

            {/* LOGOUT BUTTON WITH CUSTOM TFMSTooltip */}
              <TFMSTooltip label="Logout" placement="bottom" delay={200}>
                <Button
                  aria-label="Logout"
                  size="sm"
                  borderRadius="full"
                  color="brand.600"
                  variant="none"
                  transition="transform 160ms ease, box-shadow 160ms ease, background 160ms ease"
                _hover={{
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 18px rgba(15, 88, 190, 0.4)",
                  bg: "rgba(64, 125, 211, 0.1)"
                }}
                _active={{ transform: "translateY(0)", boxShadow: "none" }}
                  onClick={() => {
                    try {
                      console.log("[DEBUG] Logout clicked");
                      // Workflow: real logout handler added later
                    } catch (err) {
                      console.error("Logout action error:", err);
                    }
                  }}
                >
                  <Icon as={FiLogOut} boxSize={7} />
                </Button>
              </TFMSTooltip>
          
          </Flex>
        </Flex>
    </Box>
  );
}

export default Header

{/* <Tooltip.Root delayDuration={300}>
          <Flex position="relative" display="inline-flex">
            <Tooltip.Trigger asChild>
              <Button
                variant="none"
                size="xl"
                color="brand.600"
                borderRadius="full"
                mr={3}
                aria-label="Logout"
                transition="transform 160ms ease, box-shadow 160ms ease, background 160ms ease"
                _hover={{
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 18px rgba(15, 88, 190, 0.6)",
                  bg: "rgba(15, 88, 190, 0.1)"
                }}
                _active={{ transform: "translateY(0)", boxShadow: "none" }}
              >
                <Icon as={FiLogOut} boxSize={7} />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content
              side="bottom"
              align="center"
              sideOffset={8}
              className="tfms-tooltip"
              css={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 9999,
                pointerEvents: "none",

                // arrow (svg)
                "& svg": {
                  position: "absolute !important",
                  top: "-6px !important",
                  left: "50% !important",
                  transform: "translateX(-50%) !important",
                },

                // arrow wrapper
                "& [data-radix-tooltip-arrow]": {
                  position: "absolute !important",
                  top: "-6px !important",
                  left: "50% !important",
                  transform: "translateX(-50%) !important",
                }
              }}
            >
              Logout
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Flex>
        </Tooltip.Root> */}