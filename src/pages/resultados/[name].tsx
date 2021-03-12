import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Container, Flex, Heading, Link } from '@chakra-ui/layout'
import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/table'

import { dataMapper } from '../../utils/mappers'
import Footer from '../../components/Footer'
import Loader from '../../components/Loader'
import { useToast } from '@chakra-ui/toast'
import { Button } from '@chakra-ui/button'

type ResultItem = {
  period: string
  total: number
}

export default function Home() {
  const { push, query } = useRouter()
  const toast = useToast()

  const { name } = query
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<ResultItem[]>([])

  useEffect(() => {
    if (!query.name) return

    fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${name}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data[0]) {
          toast({
            title: 'Ops, nenhuma informação encontrada!',
            description: 'Confira o nome informado e tente novamente.',
            status: 'error',
            duration: 9000,
            isClosable: true
          })

          push('/')

          return
        }

        setData(dataMapper(data[0].res))
        setIsLoading(false)
      })
  }, [query, name, toast, push])

  return (
    <>
      <Flex
        bg="gray.800"
        height={{
          base: '100%',
          xl: '100vh'
        }}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Container maxW="container.xl">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Heading mb="4" color="hotpink">
                {name}, esses foram os dados encontrados:
              </Heading>

              <Table
                variant="striped"
                colorScheme="pink"
                color="hotpink"
                mb="4"
              >
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

              <Button
                width="full"
                variant="outline"
                colorScheme="PINK"
                color="hotpink"
                onClick={() => push('/')}
              >
                Nova consulta
              </Button>
            </>
          )}
        </Container>
      </Flex>
      <Footer />
    </>
  )
}
