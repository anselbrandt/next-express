import {
  Box,
  Flex,
  List,
  ListItem,
  ListIcon,
  Link as ChakraLink,
  useColorMode,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  BoxProps,
} from "@chakra-ui/core";
import { CalendarIcon, TimeIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { withApollo } from "../utils/withApollo";
import { useNextLaunchQuery } from "../generated/graphql";
import { useEffect, useState } from "react";

interface SpacexProps {
  defaultColor: string;
  props: BoxProps;
}

interface Launch {
  date: string | null | undefined;
  time: string | null | undefined;
  timezone: string | null | undefined;
  rocket: string | null | undefined;
  details: string | null | undefined;
}

const Spacex: React.FC<SpacexProps> = ({ defaultColor, props }) => {
  const { colorMode } = useColorMode();
  const themeColor = {
    light: `${defaultColor}.500`,
    dark: `${defaultColor}.200`,
  };

  const { data } = useNextLaunchQuery();
  const [launch, setLaunch] = useState<Launch | undefined>();

  useEffect(() => {
    if (data) {
      const epoch = new Date(data.launchNext!.launch_date_unix * 1000);
      const date = epoch.toDateString();
      const time = epoch.toLocaleTimeString();
      const timezone = epoch.toString().split("(")[1].replace(")", "");
      const obj = {
        date: date,
        time: time,
        timezone: timezone,
        rocket: data.launchNext!.rocket!.rocket_name,
        details: data.launchNext!.details,
      };
      setLaunch(obj);
    }
  }, [data]);

  return (
    <Box>
      <Box>From GraphQL:</Box>
      <Box
        border="1px solid"
        borderColor={themeColor[colorMode]}
        mt="1rem"
        p="1.75rem"
        pb="1rem"
        {...props}
      >
        <Box mb="1rem">
          <ChakraLink isExternal href={"https://www.spacex.com/launches/"}>
            Next SpaceX launch <ExternalLinkIcon />
          </ChakraLink>
        </Box>
        {launch ? (
          <Box>
            <List spacing={3}>
              <ListItem>
                🚀 &nbsp;
                {launch.rocket}
              </ListItem>
              <ListItem>
                <ListIcon as={CalendarIcon} color={themeColor[colorMode]} />
                {launch.date}
              </ListItem>
              <ListItem>
                <ListIcon as={TimeIcon} color={themeColor[colorMode]} />
                {launch.time} {launch.timezone}
              </ListItem>
            </List>
            <Accordion allowToggle mt="1rem">
              <AccordionItem borderTop="none" borderBottom="none">
                <AccordionButton _hover={{ backgroundColor: "none" }}>
                  <Box flex="1" textAlign="right">
                    Details
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={1}>{launch.details}</AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        ) : null}
      </Box>
      <Flex justifyContent="flex-end" mt="1rem">
        <ChakraLink isExternal href={"https://api.spacex.land/graphql/"}>
          SpaceX Land API <ExternalLinkIcon />
        </ChakraLink>
      </Flex>
    </Box>
  );
};

export default withApollo({ ssr: true })(Spacex);
