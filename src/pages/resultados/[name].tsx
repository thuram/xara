import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Container, Flex, Heading, Link, Text } from '@chakra-ui/layout'
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/table'
import { Spinner } from '@chakra-ui/spinner'

import { dataMapper } from '../../utils/mappers'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import Footer from '../../components/Footer'

type ResultItem = {
  period: string
  total: number
}

export default function Home() {
  const { query } = useRouter()

  const { name } = query
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<ResultItem[]>([])

  useEffect(() => {
    if (!query.name) return

    fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setData(dataMapper(data[0].res))
        setIsLoading(false)
      })
  }, [query, name])

  return (
    <Flex
      bg="gray.800"
      height="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="container.xl">
        {isLoading ? (
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
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
        ) : (
          <>
            <Heading mb="4" color="hotpink">
              {name}, esses foram os dados encontrados:
            </Heading>

            <Table variant="striped" colorScheme="pink" color="hotpink">
              <Thead>
                <Tr>
                  <Th>Período</Th>
                  <Th isNumeric>Frequência de nascimentos</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.period}</Td>
                    <Td isNumeric>{item.total}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Período</Th>
                  <Th isNumeric>Frequência de nascimentos</Th>
                </Tr>
              </Tfoot>
            </Table>
          </>
        )}
      </Container>
      <Footer />
    </Flex>
  )
}
