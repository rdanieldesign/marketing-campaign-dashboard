# Product Requirements Document: "Campaign Orbit" – Ad Manager

## Project Overview

Our growth marketing team is struggling to manage their various ad campaigns across multiple platforms. They need a single-pane-of-glass "Ad Manager" that allows them to track performance, toggle campaign status on the fly, and view a breakdown of spend vs. conversion.

## User Persona

**The Growth Lead:** Needs to monitor daily budgets, identify underperforming ads, and make quick "kill-switch" decisions based on real-time ROI data.

---

## Feature 1: Campaign Performance Ledger (MVP)

**Goal:** A comprehensive view of all active and paused ad campaigns.

- **Data Display:** Each campaign row/card must display:
  - **Campaign Name & Platform:** (e.g., Google, Meta, TikTok).
  - **Status:** A visible "Active" or "Paused" state.
  - **Metrics:** Daily Budget, Total Spend, and Conversion Rate.
- **Inline Actions:** Each campaign must have a **Toggle Switch** or button to flip the status between Active and Paused. The UI must reflect this change immediately.

## Feature 2: The "At-a-Glance" Analytics Bar

**Goal:** Provide aggregated data for quick decision-making.

- **Summary Metrics:** A header section that displays the **Total Spend** and **Average Conversion Rate** for all _currently visible_ campaigns.
- **Dynamic Updates:** If a user filters the list or pauses a campaign, these totals must recalculate in real-time.

## Feature 3: Smart Filtering & Budget Thresholds

**Goal:** Help the user focus on high-spend or low-performance items.

- **Platform Filter:** A dropdown or button group to filter by platform (e.g., Show only Meta ads).
- **Search:** A search bar to filter by Campaign Name.
- **Budget Alerts:** Any campaign that has a "Total Spend" exceeding its "Daily Budget" should be visually highlighted with a "Budget Warning" badge or color change.

## Feature 4: Async Stability & Persistence Simulation

**Goal:** Handle the "Save" lifecycle and network reliability.

- **Syncing State:** When a user toggles a campaign status, show a brief "Saving..." indicator for that specific row.
- **Optimistic UI:** The toggle should appear to work instantly.
- **Error Handling:** Simulate a scenario where the API call fails; the UI must revert the toggle to its previous state and show an error notification.
- **Initial Load:** A robust loading state (skeleton or spinner) for the first time the ledger is populated.

---

## Success Criteria

1. The user can pause a campaign and see the "Total Spend" summary update automatically.
2. The interface handles a list of campaigns without performance lag.
3. The "Budget Warning" logic correctly identifies over-budget campaigns even after filters are applied.
4. Error states are handled gracefully without breaking the rest of the dashboard.
