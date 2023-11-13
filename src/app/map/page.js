import MapComponent from "@/components/Map";
import dynamic from "next/dynamic";

const DynamicMapComponent = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default async function Map() {
  return <DynamicMapComponent />;
}
