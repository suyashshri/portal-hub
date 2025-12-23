import Dashoboard from "@/pages/Dashoboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: Dashoboard,
});
