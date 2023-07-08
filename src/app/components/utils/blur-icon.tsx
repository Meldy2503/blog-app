"use client";

import { Icon, IconProps, useBreakpointValue } from "@chakra-ui/react";

export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#f56565a5" />
      <circle cy="491" r="139" fill="#ed64a6b0" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#ffedcc7f" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ed8836b0" />
      <circle cx="244" cy="606" r="139" fill="#543EE0" />
      <circle cx="196.5" cy="517.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48bb78e8" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
