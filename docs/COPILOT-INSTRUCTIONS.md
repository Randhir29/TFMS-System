# GitHub Copilot Project Instructions

This project includes additional AI reference documentation for **Chakra UI v3**, stored inside the repository so that **GitHub Copilot Pro / Individual** can use it during code generation.

The main reference file is:

```
docs/ai/chakra/llms-full.txt
```

This file contains the complete Chakra UI v3 LLM-optimized documentation including:

* Tokens & Semantic Tokens
* Recipes (Button, Input, etc.)
* Theming system
* Style system & patterns
* Component APIs
* Migration notes (v2 → v3)
* Examples & usage patterns

---

## ✅ How to Reference Chakra UI Docs in Copilot Prompts

### **General reference**

```
Use the Chakra UI v3 documentation in docs/ai/chakra/llms-full.txt for this task.
```

### **Theming generation**

```
Refer to docs/ai/chakra/llms-full.txt and generate a complete Chakra UI v3 theme.js using:
- defineTokens
- defineSemanticTokens
- recipes for Button, Input, and Card
```

### **Recipe creation**

```
Using docs/ai/chakra/llms-full.txt, generate a button.recipe.js with solid, subtle, outline variants and sm/md/lg sizes using token references.
```

### **Component creation**

```
Read docs/ai/chakra/llms-full.txt and build a modern Login page (Box, Flex, Heading, Input, FormControl, Button recipe). Include token-based spacing and semantic colors.
```

### **Migration assistance**

```
Using the migration guidelines in docs/ai/chakra/llms-full.txt, convert this Chakra UI v2 Button component to Chakra UI v3 recipe style.
```

---

## 🧠 Tips for Best Copilot Results

### **1. Always mention the file path**

Copilot does not assume context automatically. Use:

```
See docs/ai/chakra/llms-full.txt
```

### **2. For large tasks, ask Copilot to extract rules first**

```
Summarize the recipe system from docs/ai/chakra/llms-full.txt and then generate a recipe for a Badge component.
```

### **3. For styling accuracy**

```
Follow Chakra UI v3 theming guidelines as documented in docs/ai/chakra/llms-full.txt.
```

### **4. For consistent design system**

```
Use the token patterns defined in docs/ai/chakra/llms-full.txt to make spacing, colors, and typography consistent across components.
```

---

## 📁 File Location Summary

```
/docs
    /ai
        /chakra
            llms-full.txt  ← AI reference used by Copilot
    COPILOT-INSTRUCTIONS.md ← This file
```

---

## ✔ Purpose of This File

This file tells GitHub Copilot how to:

* Read Chakra UI v3 documentation from inside your repository
* Use it for code generation
* Follow your design system consistently
* Produce correct Chakra UI v3-compliant components, themes, and recipes

---

## 📌 Reminder



---

If you update Chakra UI docs, replace the file at:

```
docs/ai/chakra/llms-full.txt
```

and commit the changes.
