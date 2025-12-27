// src/ui/sidebar/SidebarDesktop.jsx
import {
  Accordion,
  Box,
  Menu,
  Text,
  useRecipe
} from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";

import { FiChevronDown } from "react-icons/fi";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

import sidebarRecipe from "../../../theme/recipes/sidebar.recipe";
import sidebarIconRecipe from "../../../theme/recipes/sidebarIcon.recipe";
import sidebarItemRecipe from "../../../theme/recipes/sidebarItem.recipe";
import TFMSTooltip from "../TFMSTooltip";

import * as LucideIcons from "react-icons/lu";
import menuData from "../../../utils/data.json";

// ------------------------------------------------------------
// Constants
// ------------------------------------------------------------
const HOVER_DELAY_MS = 120;
const HOVER_COLLAPSE_DELAY_MS = 250;

// ------------------------------------------------------------
// Icon Resolver
// ------------------------------------------------------------
function getIconByName(name) {
  return LucideIcons[name] || null;
}
// ------------------------------------------------------------
// Component: SidebarDesktop
// ------------------------------------------------------------
export default function SidebarDesktop() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(true);
 // const [pinned, setPinned] = useState(false);
  const [expandedHover, setExpandedHover] = useState(false);

  const expanded = !collapsed || expandedHover;
  // console.log("SideBar extended state:", expanded);

  const [openItems, setOpenItems] = useState([]);

  const enterTimer = useRef(null);
  const leaveTimer = useRef(null);

  // ------------------------------------------------------------
  // Recipe Slot Hooks
  // ------------------------------------------------------------
  const sidebarSlot = useRecipe({ recipe: sidebarRecipe });
  const itemSlot = useRecipe({ recipe: sidebarItemRecipe });
  const iconSlot = useRecipe({ recipe: sidebarIconRecipe });


  // console.log(Object.keys(LucideIcons).filter(k => k.includes("Panel")));

  // Call the recipe function with current props to get the specific style objects for each part

  const sidebarStyles = sidebarSlot({
    size: expanded ? "expanded" : "collapsed",
  });

  const sideBarToogleButtonStyles = itemSlot().row;
  // ------------------------------------------------------------
  // Active route check
  // ------------------------------------------------------------
  const isActiveRoute = (to) => {
    if (!to) return false;
    return (
      location.pathname === to || location.pathname.startsWith(to)
    );
  };
  // ------------------------------------------------------------
  // Navigation
  // ------------------------------------------------------------
  const handleNavigate = useCallback(
    (to) => {
      if (!to) return;
      navigate(to);
    },
    [navigate]
  );

    const onClickToogleBtn = () => {
      setExpandedHover(prev => {
          if (prev) {
          setOpenItems([]);   // collapse items when closing
      }
       return !prev;         // toggle true/false
     });
    };

  // ------------------------------------------------------------
  // Render Child Item
  // ------------------------------------------------------------
  const renderChild = (child) => {
  const Active = isActiveRoute(child.to);
  const IconC = getIconByName(child.icon);

  const rowStyles = itemSlot({
    expanded: "true" ,
    mode: "accordion",
    level:"child",
  });


  return (
    <Box
      key={child.id}
      as="button"
      css={rowStyles.row}
      style={Active?{backgroundColor: "#0a4e8c"} : {}}
      pl="2.5rem"
      mt="4px"
      data-id={child.id}
      data-group="row"
      onClick={() => handleNavigate(child.to)}
    >
      <Box css={rowStyles.iconWrap}
      style={Active?{color: "#f9fafb"} : {}}>
        {IconC ? (
          <IconC />
        ) : (
          <Box width="1.5rem" height="1.5rem" bg="brand.400" borderRadius="md" />
        )}
      </Box>

      {expanded && (
        <Text css={rowStyles.label}
        style={Active?{color: "#f9fafb"} : {}}>
          {child.label}
        </Text>
      )}
    </Box>
  );
};
  const renderMenuChild = (child) => {
  const Active = isActiveRoute(child.to);
  const IconC = getIconByName(child.icon);

  const rowStyles = itemSlot({
    expanded: "false",
    mode: "menu",
    level:"child",
  });

  return (
    <Box
      as="button"
      style={Active?{backgroundColor: "#063664"} : {}}
      data-id={child.id}
      data-group="row"
      onClick={() => handleNavigate(child.to)}
    >
      <Box css={rowStyles.iconWrap}
      style={Active?{color: "#f9fafb"} : {}}>
        {IconC ? (
          <IconC />
        ) : (
          <Box width="1.5rem" height="1.5rem" bg="brand.400" borderRadius="lg" />
        )}
      </Box>

      <Text css={rowStyles.label}
      style={Active?{color: "#f9fafb"} : {}}
      >{child.label}</Text>
    </Box>
  );
};


  // ------------------------------------------------------------
  // Render Parent Item
  // ------------------------------------------------------------
  const renderParent = (parent) => {
  const ParentActive = parent.children.some((c) => isActiveRoute(c.to));
  const IconC = getIconByName(parent.icon);

  const rowStyles = itemSlot({
    expanded: expanded ? "true" : "false",
    mode: expanded ? "accordion" : "menu",
    level:"parent",
  });

  // ---------- EXPANDED: ACCORDION ----------
    if (expanded) {
      return (
        <Accordion.Item key={parent.id} value={parent.value}>
          <Accordion.ItemTrigger
            css={rowStyles.row}
            style={ParentActive?{backgroundColor: "#4d96ff"} : {}}
            data-id={parent.id}
            data-group="row"
          >
            <Box css={rowStyles.iconWrap}
            style={ParentActive?{color: "#f9fafb"} : {}}
            >
              {IconC ? (
                <Box as={IconC} />
              ) : (
                <Box width="20px" height="20px" bg="gray.400" borderRadius="md" />
              )}
            </Box>

            <Text css={rowStyles.label}
            style={ParentActive?{color: "#f9fafb"} : {}}
            >{parent.label}</Text>

            <Accordion.ItemIndicator css={rowStyles.indicator}>
              <FiChevronDown color={ParentActive ? "#f9fafb" : "currentColor"} />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>

          <Accordion.ItemContent>
            <Box display="flex" flexDirection="column" gap="4px">
              {parent.children.map(renderChild)}
            </Box>
          </Accordion.ItemContent>
        </Accordion.Item>
      );
    }

    // ---------- COLLAPSED: MENU ----------
    return (
      <Menu.Root key={parent.id} positioning={{ placement: "right-start" }}>
        <TFMSTooltip label={parent.label}>
          <Menu.Trigger asChild>
            <Box
              as="button" 
              css={rowStyles.row}
              px= {2}
              py= {2}
              style={ParentActive?{backgroundColor: "#4d96ff"} : {}}
              data-group="row"
              data-id={parent.id}
            >
              <Box css={rowStyles.iconWrap}
              style={ParentActive?{color: "#f9fafb"} : {}}
              >
                {IconC ? (
                  <Box as={IconC} />
                ) : (
                  <Box w="20px" h="20px" bg="gray.400" borderRadius="md" />
                )}
              </Box>

              <Box css={rowStyles.indicator}>
                <FiChevronDown color={ParentActive ? "#f9fafb" : "currentColor"}/>
              </Box>
            </Box>
          </Menu.Trigger>
        </TFMSTooltip>

        <Menu.Positioner style={{ position: "absolute", zIndex: 9999 }}>
          <Menu.Content >
            {parent.children.map((child) => (
              <Menu.Item key={child.id} value={child.value} asChild css={rowStyles.row}>
                {renderMenuChild(child)}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    );
};

// let el = document.querySelector('[data-id="tank-management"][data-group="row"]');
// let cs = window.getComputedStyle(el);
// let out = {};
// for (let p of cs) { out[p] = cs.getPropertyValue(p); }
// console.log(out);


  const containerCss =  sidebarStyles.container;
  const scrollCss = sidebarStyles.scroll;
  const toggleCss = sidebarStyles.toggle;

   return (
    
    <Box
      css={containerCss}
    >
      {/* Menu */}

      <Box css={scrollCss} >

        <Accordion.Root
          style={{ display: "block" }}
          value={openItems}
          onValueChange={
            (e) => {
            setOpenItems(e.value);
            }
          }

          multiple   

          defaultValue={[]}

        >

          {menuData.menuItems.map(renderParent)}

          {/* SideBar Toggle Switch*/}

          { expanded ?

            (

              <Box

                  as="button"

                  onClick={onClickToogleBtn}

                  aria-label="Toggle sidebar"

                  css={toggleCss}

                >

                    <Box css={{...sideBarToogleButtonStyles,px:4,py:2, justifyContent:"flex-start", gap:"32px", fontSize: "1.15rem"}}>

                      <LuPanelLeftClose size="1.5rem" />

                      <Text>Collapse Sidebar</Text>

                    </Box>

                </Box>

            ) :
            (
              <TFMSTooltip

                    label= "Toggle sidebar"

                    placement="right"

                    offset={{ x: 0, y: 0 }}
              >

                <Box

                  as="button"

                  onClick={onClickToogleBtn}

                  aria-label="Toggle sidebar"

                  css={toggleCss}

                >

                    <Box css={{...sideBarToogleButtonStyles,px:4,py:2, 
                      justifyContent:"flex-start", fontSize: "1.5rem"}}>
                      <LuPanelRightClose/>
                    </Box>
                </Box>
              </TFMSTooltip>
            )
  }
        </Accordion.Root>
      </Box> 
    </Box>
  );
}
