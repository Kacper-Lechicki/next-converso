# 🧪 Testing Guide

This project uses **Vitest** (a fast, modern alternative to Jest) and **React Testing Library**.
We follow the **Co-location** pattern, keeping tests right next to the code they test.

## 🚀 Quick Start

| Command            | Description                                                       |
| ------------------ | ----------------------------------------------------------------- |
| `npm run test`     | Runs tests in **watch mode**. Reruns automatically when you save. |
| `npm run test:run` | Runs all tests **once**. Useful for CI/CD or final checks.        |

---

## 📂 Where should I put my tests?

**Specific Rule: "Co-location"**
Don't hide tests in a separate `tests/` folder. Place them exactly where the source file is.

- **Component:** `components/ui/button.tsx`
- **Test:** `components/ui/button.test.tsx`

**Why?**

1. **Visibility:** You see the test immediately when editing the component.
2. **Maintenance:** When you move or delete a component, the test logically goes with it.
3. **Simplicity:** No need to maintain a mirrored folder structure.

---

## 📝 How to Write a Test

### 1. Unit Test (Logic)

_Best for: Helpers, utility functions, data transformations._

```typescript
// lib/math.test.ts
import { describe, it, expect } from 'vitest';
import { add } from './math';

describe('math utility', () => {
  it('adds two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

### 2. Component Test (UI)

_Best for: Interactive components, conditional rendering._

```typescript
// components/Profile.test.tsx
import { render, screen } from '@testing-library/react'
import { Profile } from './Profile'

describe('Profile Component', () => {
  it('renders user name', () => {
    // 1. Render
    render(<Profile name="Alice" />)

    // 2. Assert
    expect(screen.getByText('Alice')).toBeInTheDocument()
  })
})
```

---

## 💡 What Should I Test? (The "High Value" Strategy)

Since this is a training app, don't aim for 100% coverage. Focus on **Value**.

### ✅ DO TEST:

1. **Complex Logic:** Identify functions in `lib/` or hooks that have strict rules (e.g., specific date formatting, validation logic).
2. **Critical User Flows:** If a "Submit" button breaks the app, test that button.
3. **Bug Fixes:** If you find a bug, write a test that fails (reproves the bug), fix the code, and ensure the test passes.

### ❌ DO NOT TEST:

1. **Trivial UI:** Don't test that a `<div>` renders a `<div>`.
2. **Third-Party Libraries:** Don't test if `date-fns` works. Assume it does.
3. **Implementation Details:** Don't test _how_ a component achieves a result, test _what_ the user sees.

---

## CHEAT SHEET: Common Matchers

- `expect(value).toBe(5)` -> Exact equality
- `expect(value).toEqual({ id: 1 })` -> Object/Array equality
- `expect(element).toBeInTheDocument()` -> DOM Check
- `expect(element).toHaveClass('bg-red-500')` -> Class Check
- `expect(fn).toHaveBeenCalled()` -> Function spy check
