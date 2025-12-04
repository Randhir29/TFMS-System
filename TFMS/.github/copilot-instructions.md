# GitHub Copilot Instructions — Tank Farm Management System (TFMS)

## 1. Project Overview

This is an enterprise-grade Tank Farm Management System built using:

* **Backend:** .NET C# MVC + Clean Architecture
* **Database:** MS SQL + Dapper
* **Frontend:** React (Vite) + **Chakra UI v3** + TanStack Table + Zustand + React Query
* **Charts:** Recharts
* **Exports:** SheetJS (Excel) + pdfmake (PDF)

The goal is to ensure predictable, high-quality Copilot output throughout the project.

---

## 2. Coding Style & Conventions

* Use async/await everywhere.
* Naming:

  * PascalCase for classes, interfaces, enums
  * camelCase for variables and function parameters
* Use SOLID principles automatically.
* File naming:

  * C# files: PascalCase.cs
  * React files: camelCase.jsx / camelCase.tsx
  * DTOs: PascalCaseDto.cs
  * Repositories: PascalCaseRepository.cs

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

* Generate DTOs for all inputs/outputs
* Create Repositories + Interfaces + Services
* Use Dapper for DB operations
* Keep controllers thin
* Use AutoMapper profiles

---

## 4. Database & SQL Standards

* SQL must be formatted, multi-line, and parameterized.
* Stored procedures must use TRY/CATCH.
* Naming convention: `spModule_Action`.

---

## 5. Dapper Repository Rules

* Hybrid structure.
* Repositories implement interfaces.
* Use IDbConnection via DI.
* Return DTOs only.

---

## 6. Service Layer Rules

* Business logic must be in services.
* Use interfaces.
* Validate inputs.
* No Dapper calls in services.

---

## 7. Controller Rules

* Thin controllers.
* Use DTOs.
* Apply `[Authorize]`.
* Return proper HTTP status codes.

---

## 8. Middleware & Security Rules

Copilot must generate:

* JWT authentication middleware
* Authorization middleware
* Logging middleware
* Exception middleware

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

---

## 10. React Component Rules

* Use **Chakra UI v3 System**.
* Functional components only.
* Use Recharts, TanStack Table, Zustand, React Query, react-hook-form.
* Extract reusable components.

---

# **11. Chakra UI v3 — Strict Instructions (Using docs/ai/chakra/llms-full.txt)**

Copilot must follow these rules **strictly** for all Chakra UI v3 code.
Your full documentation is located at:

```
docs/ai/chakra/llms-full.txt
```

### ✅ **1. Mandatory Strict Reference Mode**

Copilot must **always consult `docs/ai/chakra/llms-full.txt`** before suggesting Chakra UI v3 code. 

**Copilot must always generate React components, hooks, and UI code in pure .jsx syntax (no TypeScript).Avoid TypeScript-only features such as interfaces, types, generics, enums, typed props, or TSX-exclusive syntax.Any TSX example should be automatically converted into valid JSX that works inside JavaScript files without breaking the application.**

### ✅ **2. Only Use Your Custom Theme**

* Never use Chakra's default theme values.
* Always import system from your theme:

  ```js
  import { system } from "@/theme";
  ```
* No local system creation inside components.

### ✅ **3. Recipe + Inline Props Hybrid Rule**

Copilot must:

* Use your Chakra recipes (`defineRecipe`) for:

  * buttons
  * inputs
  * form controls
  * layout components
* Inline style props allowed only for **unique component-specific design**.

### ✅ **4. Centralized System Setup**

* All theme config, tokens, recipes, and system exist in `src/theme/`.
* Copilot must never recreate Chakra system config in components.
* Always respect Vite path alias `@/`.

### ✅ **5. Functional + Hook-Driven React Style**

Copilot must:

* Prefer small functional components.
* Use hooks for state/logic (e.g., `useLogin`, `useDashboard`, `useFormData`).
* Separate logic hooks from UI components.

### ✅ **6. Feature-Based Structure**

Copilot must follow:

```
src/features/<module>/Component.jsx
src/features/<module>/useModule.js
```

No flat or mixed structures.

### ✅ **7. Modern JS + JSDoc Typing**

Copilot should:

* Use `.jsx` or `.js` only.
* Add JSDoc types for props, hooks, and utilities.

### ⚠️ **8. What Chakra Rules Copilot Must Avoid**

* No Chakra v1/v2 props (e.g., `colorScheme`, `variantColor`).
* No usage of deprecated components.
* No usage of old theming API like `extendTheme()`.
* No default tokens — always use your tokens.

### ⚡ **9. Example Copilot Behavior (Mandatory)**

When generating a Button, Copilot must:

* Import your recipe: `buttonRecipe`
* Use it like:

  ```jsx
  <Button className={buttonRecipe({ variant: "solid" })}>Save</Button>
  ```

If inline props are needed, they must:

* Not duplicate recipe styles
* Not conflict with tokens

---

## 12. API Call Rules (Axios + React Query)

* Single Axios instance with interceptors.
* Use useQuery/useMutation.
* Enable caching for dashboards.

---

## 13. Tables (TanStack Table v8)

* Generate columns, filtering, pagination.
* Use Chakra UI wrappers.
* Provide export buttons.

---

## 14. Dashboard Charts (Recharts)

* Use Line, Area, Bar, Pie, Composed Charts.
* Responsive.
* Use Chakra Cards.

---

## 15. Export Functionality

* Excel: SheetJS (xlsx)
* PDF: pdfmake

---

## 16. Error Handling Rules

* Chakra UI toast notifications.
* Axios global error handler.
* ErrorBoundary component.
* AccessDenied & NotFound pages.

---

## 17. Git & PR Rules

* Commit messages: Conventional Commits.
* Branch strategy: GitHub Flow.
* PR must include:

  * Summary
  * Before/After
  * Screenshots for UI work
  * Linked Jira/Work item
  * Suggested unit tests

---

## 18. What Copilot Should Avoid

* No inline SQL in C#.
* No business logic in controllers.
* No class components.
* No untyped JS.
* No redundant code.

---

## 19. What Copilot Should Always Do

* Follow Clean Architecture.
* Generate mappings, interfaces, DTOs.
* Use Chakra UI for UI.
* Ensure secure code.
* Provide meaningful comments only when helpful.

---

End of Copilot Instructions.
