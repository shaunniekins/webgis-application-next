import { Suspense } from "react";

import AboutComponent from "@/components/About";
import LoadingThreeDots from "@/components/LoadingThreeDots";

export default function About() {
  return (
    <Suspense fallback={<LoadingThreeDots />}>
      <AboutComponent />
    </Suspense>
  );
}
