import { Hero } from "@/components/sections/Hero";
import { WhatThisIs } from "@/components/sections/WhatThisIs";
import { WhatImBuilding } from "@/components/sections/WhatImBuilding";
import { HowIWork } from "@/components/sections/HowIWork";
import { Story } from "@/components/sections/Story";
import { Invitation } from "@/components/sections/Invitation";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatThisIs />
      <WhatImBuilding />
      <HowIWork />
      <Story />
      <Invitation />
      <FinalCta />
    </>
  );
}
