import { Box, Flex, Link as ChakraLink, useColorMode } from "@chakra-ui/core";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Navbar } from "../components/Navbar";
import useGetKanye from "../hooks/useGetKanye";

interface IndexProps {
  defaultColor: string;
}

const Index: React.FC<IndexProps> = ({ defaultColor }) => {
  const { colorMode } = useColorMode();
  const themeColor = {
    light: `${defaultColor}.500`,
    dark: `${defaultColor}.200`,
  };

  const { data, error } = useGetKanye();

  return (
    <Container minHeight="100vh">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/">Home</ChakraLink>
      </Navbar>
      <Box mt="30vh" maxW="48rem">
        {error ? (
          "Whoops."
        ) : (
          <>
            <Box m="1rem">{data}</Box>
            <Flex justifyContent="flex-end" m="1rem">
              <ChakraLink
                isExternal
                href="https://kanye.rest/"
                color={themeColor[colorMode]}
              >
                kanye.rest
              </ChakraLink>
            </Flex>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Index;
