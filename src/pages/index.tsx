import { FormEvent, useState } from 'react'
import Router from 'next/router'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Container, Flex, Heading, Link, Text } from '@chakra-ui/layout'
import Footer from '../components/Footer'

export default function Home() {
  const [name, setName] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!name) return

    Router.push(`/resultados/${name}`)
  }

  return (
    <Flex
      bg="gray.800"
      height="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="container.xl">
        <Heading mb="4" color="hotpink">
          Xará, sabe quantos $SEU_NOME existem?
        </Heading>
        <Text color="gray.100">
          Um estudo que foi realizado pelo IBGE mostra a frequência dos nomes
          por década de nascimento, a primeira coleta foi relizada em 2010,
          todos os dados são públicos e estão disponíveis no site do IBGE.
        </Text>

        <Text color="gray.100" mt="2">
          Digite seu nome no campo abaixo e veja todos os dados relacionados.
        </Text>

        <Flex as="form" mt="4">
          <Input
            placeholder="Digite apenas o primeiro nome (Ex.: lucas)"
            color="gray.100"
            focusBorderColor="hotpink"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            type="submit"
            colorScheme="pink"
            ml="4"
            onClick={handleSubmit}
          >
            Procurar
          </Button>
        </Flex>
      </Container>

      <Footer />
    </Flex>
  )
}
