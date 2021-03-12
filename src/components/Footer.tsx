import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Container, Flex, Link, Text } from '@chakra-ui/layout'

const Footer = () => (
  <Box
    position="fixed"
    bottom="0"
    left="0"
    right="0"
    borderTop="1px"
    borderColor="hotpink"
  >
    <Container maxW="container.xl">
      <Flex p="4" alignItems="center" justifyContent="space-between">
        <Text color="gray">
          Dados foram retirados do{' '}
          <Link
            color="hotpink"
            href="https://servicodados.ibge.gov.br/api/docs/nomes?versao=2#api-_"
            isExternal
          >
            IBGE (API NOMES) <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>

        <Text color="gray">
          Feito por{' '}
          <Link href="https://github.com/thuram" color="hotpink" isExternal>
            @thuram
          </Link>
        </Text>
      </Flex>
    </Container>
  </Box>
)

export default Footer
