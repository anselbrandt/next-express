import { Box, useColorMode, BoxProps } from "@chakra-ui/core";
import { withApollo } from "../utils/withApollo";
import { useServerStatusQuery } from "../generated/graphql";

interface LocalGraphqlProps {
  defaultColor: string;
  props: BoxProps;
}

const LocalGraphql: React.FC<LocalGraphqlProps> = ({ defaultColor, props }) => {
  const { colorMode } = useColorMode();
  const themeColor = {
    light: `${defaultColor}.500`,
    dark: `${defaultColor}.200`,
  };

  const { data } = useServerStatusQuery();

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
        <Box mb="1rem">Status:</Box>
        {data ? <Box textAlign="center">{data.hello.status}</Box> : null}
      </Box>
    </Box>
  );
};

export default withApollo({ ssr: true })(LocalGraphql);
