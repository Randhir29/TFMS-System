import { Avatar, Button, Flex, Heading, Icon, Image, Spacer, Tooltip, useToken } from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';

import HPCLLogo from '../../../assets/HPCL_logo.jpg';


function NavBar() {
  const [modernG] = useToken('gradients', ['modernG']);

  return (
    <Flex
      as="nav"
      p="5px"
      alignItems="center"
      w="100%"
      bg="gray.100"
      shadow="glow"
      borderBottom="2px solid"
      borderColor="gray.400"
      boxShadow="0 4px 12px rgba(2,6,23,0.2)"
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
        mr={6} 
        size='xl'
        rounded="full"
        bg="brand.600"
        color="white"
        fontSize="sm"
        borderWidth="3px"
        borderColor="brand.300"
        shadow="xl"
        _hover={{
        shadow: "lg",
        borderColor: "brand.600",
        }} >
          <Avatar.Fallback> Admin</Avatar.Fallback>
        </Avatar.Root>  

        <Tooltip.Root delayDuration={300}>
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
        </Tooltip.Root>
      
      </Flex>
    </Flex>


  )
}

export default NavBar