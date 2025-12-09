# Travel Route Builder

Drag-and-drop travel planner built with React Flow and a custom Graph manager. Create nodes for countries, position them freely, and connect routes visually.

# Features
- Drag & Drop countries from a sidebar onto the canvas 
- Nodes appear exactly where dropped (screen → flow coords)
- Centralized Graph manager inside React Context
- Full sync between:
  - React Flow (UI)
  - Graph data structure (business logic)
  - Supports edges (routes between nodes)
  - Optional persistence via localStorage

# Architecture

```
GraphProvider (FlowManager instance in Context)
            ↓
   useGraphContext()
            ↓
 ------------------------------------------------
|   GraphCanvas (React Flow)                     |
|   visualizes nodes & edges from FlowManager    |
 ------------------------------------------------
            ↑
     useHandleDragAndDrop
            |
   creates new Graph nodes on drop
```


# Tech Stack

| Layer         | Technology              |
| ------------- |-------------------------|
| UI            | React + React Flow      |
| State & Data  | Context                 |
| Styling       | CSS Modules             |
| Persistence   | localStorage (optional) |
| Data fetching | REST Countries API      |


# Quick Start
```
  git clone https://github.com/tisho91/travel-route-builder
  cd travel-route-builder
  corepack enable
  pnpm install
  pnpm dev
```