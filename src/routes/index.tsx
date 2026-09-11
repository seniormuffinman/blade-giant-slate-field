import { createFileRoute } from "@tanstack/react-router";
import { BlueZoneApp } from "@/components/blue-zone-app";

export const Route = createFileRoute("/")({
  ssr: false,
  component: Home,
});

function Home() {
  return <BlueZoneApp />;
}
