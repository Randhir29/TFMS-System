# GitHub Copilot Instructions — Tank Farm Management System (TFMS)

> **This is the authoritative instruction file for GitHub Copilot Agent Mode.**
> Copilot must follow this document *strictly* and cross‑reference
> **`docs/ai/chakra/llms-full.txt`** for Chakra UI v3 patterns, theme tokens, recipes, and component specifications.

---

# 1. Project Overview

Enterprise‑grade Tank Farm Management System built with:

* **Backend:** .NET C# MVC + Clean Architecture
* **Database:** MS SQL + Dapper
* **Frontend:** React (Vite) + **Chakra UI v3 (Ark UI + Floating UI)**
* Zustand, React Query, TanStack Table
* **Charts:** Recharts
* **Exports:** SheetJS + pdfmake

**Goal:** Deliver predictable, consistent, production‑ready Copilot output.

---

# 2. Coding Style & Conventions

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

# 3. Backend Architecture (Clean Architecture)

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

# 4. Database & SQL Standards

* SQL must be formatted, multi‑line, parameterized.
* Stored procedures must use **TRY/CATCH**.
* Naming convention: `spModule_Action`.

---

# 5. Dapper Repository Rules

* Repositories implement interfaces.
* Use `IDbConnection` via DI.
* Return DTOs only.

---

# 6. Service Layer Rules

* Business logic stays in Services.
* Services must implement interfaces.
* Controllers must be thin.
* Validate all inputs.

---

# 7. Controller Rules

* Must use DTOs.
* Apply `[Authorize]`.
* Return correct HTTP status codes.

---

# 8. Middleware & Security Rules

Copilot must generate:

* JWT authentication middleware
* Authorization middleware
* Logging middleware
* Global exception middleware

---

# 9. Frontend Architecture (React + Vite)

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

# 10. React Component Rules

* Functional components only.
* **JSX only — no TypeScript.**
* Must use:

  * Chakra UI v3 (Ark UI + Floating UI)
  * Zustand
  * React Query
  * TanStack Table v8
  * react‑hook‑form
  * Recharts
* Components must be reusable.

---

# 11. Chakra UI v3 — Mandatory Rules

Copilot must load **`docs/ai/chakra/llms-full.txt`** **before generating UI code.**

## ✔ 11.1 JSX‑Only

* No TSX, no types, no interfaces, no generics.

## ✔ 11.2 Mandatory Ark UI Slot Architecture

**Tooltip:**

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

**Menu:**

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

## ✔ 11.3 Forbidden (Legacy Chakra v2 APIs)

Copilot must NEVER use:

* `Tooltip label="..."`
* `MenuButton`, `MenuList`, `MenuItem`
* Popper.js props (`offset`, `modifiers`)
* `colorScheme`
* Deprecated Popover/Menu syntax

## ✔ 11.4 Theme Usage Rules

* ALWAYS import system from:

```js
import { system } from "@/theme";
```

* Do NOT recreate system configs locally.
* Must use TFMS custom tokens only.

## ✔ 11.5 Recipe Usage

Use TFMS theme recipes:

```jsx
<Button className={buttonRecipe({ variant: "solid" })}>Save</Button>
```

## ✔ 11.6 Combined Component Rules

When combining Tooltip + Menu + Popover → Copilot must use the **menu‑tooltip pattern** defined in `llms-full.txt`.

---

# 12. API Layer Rules (Axios + React Query)

* Must use the shared Axios instance:

```js
import api from "@/services/apiClient";
```

* Must use React Query for all server I/O.
* Must use `queryKey`, `queryFn`, `mutationFn`, `invalidateQueries`.

---

# 13. TanStack Table Rules

Copilot must generate:

* Columns
* Sorting
* Filtering
* Pagination
* Wrapped with Chakra UI v3 components

---

# 14. Recharts Rules

* Responsive charts only
* Must wrap charts inside Chakra `Card` from TFMS recipes / llms-full.txt

---

# 15. Export Rules

* Excel → SheetJS
* PDF → pdfmake

---

# 16. Error Handling Rules

* Use TFMS Toaster wrapper (Chakra toast)
* Must show user‑friendly messages
* Global Axios error handler
* Provide `ErrorBoundary`, `AccessDenied`, `NotFound`

---

# 17. Git & PR Rules

* Conventional Commits
* GitHub Flow
* PR must contain:

  * Summary
  * Before/After screenshots
  * Linked Jira/task
  * Suggested tests

---

# 18. Copilot Must NOT Generate

* Inline SQL
* Business logic in controllers
* Class components
* TypeScript
* Redundant / unused code
* Chakra v2 syntax

---

# 19. Copilot MUST ALWAYS

* Follow Clean Architecture
* Use Chakra v3 patterns from llms-full.txt
* Use Axios + React Query
* Use TFMS theme, tokens, recipes
* Produce production‑ready code

---

# 20. TFMS Data Flow & State Management Plan (Updated)

Copilot must ALWAYS follow this exact plan.

## 20.1 Tank List Query

```js
export const useTankList = () =>
  useQuery({
    queryKey: ["tanks", "list"],
    queryFn: () => api.get("/tanks/list").then(r => r.data),
    refetchInterval: 10000,
  });
```

## 20.2 Tank Detail Query

```js
export const useTankDetail = (tankId, enabled) =>
  useQuery({
    queryKey: ["tanks", tankId, "detail"],
    queryFn: () => api.get(`/tanks/${tankId}/detail`).then(r => r.data),
    enabled,
    refetchInterval: 10000,
  });
```

## 20.3 Manual Value Update Mutation

```js
export const useManualValueUpdate = () =>
  useMutation({
    mutationFn: (payload) => api.post(`/tanks/${payload.tankId}/manual-update`, payload),
  });
```

## 20.4 Change Source (Device ↔ Manual)

```js
export const useChangeSource = () =>
  useMutation({
    mutationFn: (payload) => api.post(`/tanks/${payload.tankId}/source-change`, payload),
  });
```

## 20.5 Alarm Config + Update

```js
export const useAlarmConfig = (tankId) =>
  useQuery({
    queryKey: ["tanks", tankId, "alarm-config"],
    queryFn: () => api.get(`/tanks/${tankId}/alarm-config`).then(r => r.data),
  });

export const useAlarmUpdate = () =>
  useMutation({
    mutationFn: (payload) => api.post(`/tanks/${payload.tankId}/alarm-config/update`, payload),
  });
```

## 20.6 Query Invalidation (Mandatory)

```js
queryClient.invalidateQueries(["tanks", tankId, "detail"]);
queryClient.invalidateQueries(["tanks", "list"]);

```
