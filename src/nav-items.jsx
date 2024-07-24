import { Home, FileText, BarChart } from "lucide-react";
import Index from "./pages/Index.jsx";
import Notes from "./pages/Notes.jsx";
import NoteDetail from "./pages/NoteDetail.jsx";
import Graph from "./pages/Graph.jsx";

export const navItems = [
  {
    title: "Login",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Notes",
    to: "/notes",
    icon: <FileText className="h-4 w-4" />,
    page: <Notes />,
  },
  {
    title: "Note",
    to: "/note/:id",
    icon: <FileText className="h-4 w-4" />,
    page: <NoteDetail />,
  },
  {
    title: "Graph",
    to: "/graph",
    icon: <BarChart className="h-4 w-4" />,
    page: <Graph />,
  },
];