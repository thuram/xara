import { Flex, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'

const Loader = () => (
  <Flex flexDirection="column" alignItems="center" justifyContent="center">
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="hotpink"
      size="xl"
    />
    <Text mt="4" color="hotpink">
      Buscando os dados...
    </Text>
  </Flex>
)

export default Loader
