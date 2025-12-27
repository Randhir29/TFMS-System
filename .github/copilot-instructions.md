# GitHub Copilot Instructions — Tank Farm Management System (TFMS)

**This is the authoritative instruction file for GitHub Copilot Agent Mode.**
Copilot must follow this document *strictly* and cross-reference
`docs/ai/chakra/llms-full.txt` for Chakra UI v3 patterns, theme tokens, recipes, and component specifications.

---

## 1. Project Overview

Enterprise-grade Tank Farm Management System built with:

* **Backend:** .NET C# MVC + Clean Architecture
* **Database:** MS SQL + Dapper
* **Frontend:** React (Vite) + **Chakra UI v3 (Ark UI + Floating UI)**
* Zustand, React Query, TanStack Table
* **Charts:** Recharts
* **Exports:** SheetJS + pdfmake

**Goal:** Deliver predictable, consistent, production-ready Copilot output.

---

## 2. Coding Style & Conventions

* Always use **async/await**.
* Naming conventions:

  * PascalCase → classes, interfaces, enums
  * camelCase → variables, parameters
* Enforce **SOLID** principles.
* File naming:

  * C#: `PascalCase.cs`
  * React: `camelCase.jsx`
  * DTOs: `PascalCaseDto.cs`
  * Repositories: `PascalCaseRepository.cs`

---

## 3. Backend Architecture (Clean Architecture)

```
src/
  Domain/
  Application/
  Infrastructure/
  Web/
```

Copilot must:

* Generate DTOs
* Create Repositories + Interfaces + Services
* Use Dapper with parameterized SQL
* Keep controllers thin
* Use AutoMapper

---

## 4. Database & SQL Standards

* SQL must be formatted, multi-line, parameterized.
* Stored procedures must use **TRY/CATCH**.
* Naming convention: `spModule_Action`.

---

## 5. Dapper Repository Rules

* Repositories implement interfaces.
* Use `IDbConnection` via DI.
* Return DTOs only.

---

## 6. Service Layer Rules

* Business logic stays in Services.
* Services must implement interfaces.
* Controllers must be thin.
* Validate all inputs.

---

## 7. Controller Rules

* Must use DTOs.
* Apply `[Authorize]`.
* Return correct HTTP status codes.

---

## 8. Middleware & Security Rules

Copilot must generate:

* JWT authentication middleware
* Authorization middleware
* Logging middleware
* Global exception middleware

---

## 9. Frontend Architecture (React + Vite)

```
src/
  features/
  components/
  hooks/
  services/
  utils/
  routes/
  store/
  theme/
```

Copilot must follow this structure.

---

## 10. React Component Rules

* Functional components only.
* **JSX only — no TypeScript.**
* Must use where applicable:

  * Chakra UI v3 (Ark UI + Floating UI)
  * Zustand
  * React Query
  * TanStack Table v8
  * react-hook-form
  * Recharts
* Components must be reusable.

---

## 11. Chakra UI v3 — Mandatory Rules

Copilot must load **`docs/ai/chakra/llms-full.txt`** before generating any UI code.

### 🔴 CRITICAL: DO NOT INVENT CHAKRA APIs.

This project uses Chakra v3 with `createSystem` and `defineConfig`.
You MUST assume:

* `@chakra-ui/react` **does NOT export** `system`.
* `theme.js` **does NOT export** `Button`, `Box`, `Flex`, etc.
* `system` from `theme.js` is an object used **only** with:

  ```jsx
  <ChakraProvider value={system}>
  ```

---

### 11.1 JSX-Only

* No TSX, no TypeScript types.
* No interfaces or generics in UI files.
* All components must be `.jsx` with plain JavaScript + JSX.

---

### 11.2 Mandatory Ark UI Slot Architecture

Copilot must follow the Ark UI + Floating UI slot patterns from `llms-full.txt`.

**Tooltip pattern:**

```jsx
<Tooltip.Root positioning={{ placement: "right" }}>
  <Tooltip.Trigger asChild>{trigger}</Tooltip.Trigger>
  <Tooltip.Positioner>
    <Tooltip.Content>
      {content}
      <Tooltip.Arrow />
    </Tooltip.Content>
  </Tooltip.Positioner>
</Tooltip.Root>
```

**Menu pattern:**

```jsx
<Menu.Root positioning={{ placement: "right-start" }}>
  <Menu.Trigger asChild>{trigger}</Menu.Trigger>
  <Menu.Positioner>
    <Menu.Content>
      <Menu.Item value="edit">Edit</Menu.Item>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
```

---

### 11.3 Forbidden (Legacy Chakra v2 APIs)

Copilot must **NEVER** use:

* `Tooltip label="..."`
* `MenuButton`, `MenuList`, `MenuItem`
* Popper.js props: `offset`, `modifiers`
* `colorScheme`
* Deprecated Popover/Menu/Tooltip syntax

If Copilot suggests v2 syntax → **STOP and correct it.**

---

### 11.4 Theme Usage Rules — `theme.js` and `system`

`src/theme/theme.js` exports:

```js
export const config = defineConfig({ ... });
export const system = createSystem(defaultConfig, config);
```

Used **ONLY** like this:

```jsx
<ChakraProvider value={system}>
```

❌ INVALID — NEVER DO:

* `system("div", "box")`
* `system.createComponent(...)`
* `import { Button } from "@/theme/theme.js"`

All UI components must come from:

* Chakra primitives (`@chakra-ui/react`) via TFMS wrappers
* Ark UI packages per slot patterns

---

### 11.5 TFMS Primitives & Wrapper Components

Copilot must **never** import Chakra primitives directly in feature/UI code.

#### 11.5.1 Primitives File

```jsx
// src/tfms/primitives/Primitives.jsx
import {
  Box as ChakraBox,
  Flex as ChakraFlex,
  Text as ChakraText,
  Image as ChakraImage,
  HStack as ChakraHStack,
  VStack as ChakraVStack,
  Grid as ChakraGrid,
  SimpleGrid as ChakraSimpleGrid,
} from "@chakra-ui/react";

export const Box = ChakraBox;
export const Flex = ChakraFlex;
export const Text = ChakraText;
export const Image = ChakraImage;
export const HStack = ChakraHStack;
export const VStack = ChakraVStack;
export const Grid = ChakraGrid;
export const SimpleGrid = ChakraSimpleGrid;
```

#### 11.5.2 Usage in UI

```jsx
import { Box, Flex, Text } from "@/tfms/primitives/Primitives.jsx";
```

❌ NEVER USE:

```jsx
import { Box, Flex, Text } from "@chakra-ui/react";
```

---

### 11.6 Button, Tooltip, Sidebar & Recipes

`theme.js` defines recipes but **does not export components**.

#### 11.6.1 Button Wrapper (required)

```jsx
// src/tfms/components/Button.jsx
import { Button as ChakraButton } from "@chakra-ui/react";
export const Button = ChakraButton;
export default Button;
```

Usage:

```jsx
<Button variant="gradient" size="md">Save</Button>
```

❌ Do NOT redefine Button via system()
❌ Do NOT shadow Chakra Button
✔ Always use wrapper

---

### 11.7 Tooltip & Menu Patterns

Must use Ark UI + Floating UI slot patterns from `llms-full.txt`.

❌ NEVER use Chakra v2 Tooltip/Menu syntax.

---

## 12. API Layer Rules (Axios + React Query)

* Use shared Axios instance:

```js
import api from "@/services/apiClient";
```

* Use React Query for all server I/O.
* Use `queryKey`, `queryFn`, `mutationFn`, `invalidateQueries`.

---

## 13. TanStack Table Rules

Copilot must generate:

* Columns
* Sorting
* Filtering
* Pagination
* Wrapped using TFMS primitives

---

## 14. Recharts Rules

* Responsive charts only
* Must be wrapped inside Chakra `Card` per TFMS recipe

---

## 15. Export Rules

* **Excel:** SheetJS
* **PDF:** pdfmake

---

## 16. Error Handling Rules

* Use TFMS Toaster wrapper
* Global Axios handler
* Show user-friendly messages
* Provide:

  * `ErrorBoundary`
  * `AccessDenied`
  * `NotFound`

---

## 17. Git & PR Rules

* Conventional Commits
* GitHub Flow
* PR must contain:

  * Summary
  * Before/After screenshots
  * Jira/Task link
  * Suggested tests

---

## 18. Copilot Must NOT Generate

* Inline SQL
* Business logic in controllers
* Class components
* TypeScript
* Redundant code
* Chakra v2 syntax

---

## 19. Copilot MUST ALWAYS

* Follow Clean Architecture
* Use Chakra v3 patterns from `llms-full.txt`
* Use TFMS theme + tokens + recipes via `system` + ChakraProvider
* Produce production-ready, consistent code

---

## 20. TFMS Data Flow & State Management Plan

### 20.1 Tank List Query

```js
export const useTankList = () =>
  useQuery({
    queryKey: ["tanks", "list"],
    queryFn: () => api.get("/tanks/list").then((r) => r.data),
    refetchInterval: 10000,
  });
```

### 20.2 Tank Detail Query

```
```
