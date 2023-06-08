// "use client";

// import React, { useState } from "react";
// import { Tabs, Tab, TabList, TabIndicator, Link } from "@chakra-ui/react";
// import NextLink from "next/link";

// interface TabLinkProps {
//   tabs: { name: string; href: string }[];
//   w: string;
// }

// const TabLink = ({ tabs, w }: TabLinkProps) => {
//   const [tabIndex, setTabIndex] = useState(0);

//   return (
//     <Tabs
//       position="relative"
//       variant="unstyled"
//       onChange={(index) => setTabIndex(index)}
//     >
//       <TabList>
//         {tabs.map((tab, index) => (
//           <Tab key={index}>
//             <NextLink href={tab.href} passHref>
//               <Link w={w}>{tab.name}</Link>
//             </NextLink>
//           </Tab>
//         ))}
//       </TabList>
//       <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
//     </Tabs>
//   );
// };

// export default TabLink;
"use client";

import React, { useState } from "react";
import {
  Tabs,
  Tab,
  TabList,
  TabIndicator,
  Link,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import NextLink from "next/link";

interface TabLinkProps {
  tabs: { name: string; href: string }[];
  w: string;
}

function TabLink({ tabs, w }: TabLinkProps) {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Tabs onChange={(index) => setTabIndex(index)}>
      <TabList>
        {tabs.map((tab, index) => (
          <Tab key={index}>
            <NextLink href={tab.href} passHref>
              <Link w={w}>{tab.name}</Link>
            </NextLink>
          </Tab>
        ))}
      </TabList>
      <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
      <TabPanels p="2rem">
        <TabPanel>The Primary Colors</TabPanel>
        <TabPanel>Are 1, 2, 3</TabPanel>
        <TabPanel>Red, yellow and blue.</TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default TabLink;
