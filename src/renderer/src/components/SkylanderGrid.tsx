import { Box, SimpleGrid, Card, CardBody, Image, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { supabase } from './Database'
import Skylander from './Skylander'
import { loadUserData, checkForUserData } from './Storage'

type dbReturn = {
  id: number
  name: string
  type: {
    name: string
  }
  image: string
  game: {
    name: string
  }
}

function SkylanderGrid(): JSX.Element {
  const [skylanders, setSkylanders] = useState<Skylander[]>([])
  const [collected, setCollected] = useState<number>(0)

  const getSkylanders = async (): Promise<void> => {
    const userData = loadUserData()
    if (userData == undefined) throw `Error`

    const { data, error } = await supabase
      .from('skylanders')
      .select('id, name, type ( name ), image, game ( name )')
    if (error == null) {
      const newArray: Skylander[] = []
      let coll = 0
      //@ts-expect-error fuck supabase
      data.forEach((value: dbReturn) => {
        const obtained = userData.items[value.id - 1].obtained
        const skylander = new Skylander(
          value.id,
          value.name,
          value.type.name,
          value.game.name,
          value.image,
          obtained
        )
        newArray.push(skylander)

        if (obtained) coll++
      })
      newArray.sort(function (a, b) {
        return a.id - b.id
      })
      setSkylanders(newArray)
      setCollected(coll)
    }
  }

  const reloadSkylanders = (): void => {
    const userData = loadUserData()
    if (userData == undefined) throw `Error`

    const copy: Skylander[] = []
    let coll = 0

    skylanders.forEach((skylander) => {
      const obtained = userData.items[skylander.id - 1].obtained
      const updated = new Skylander(
        skylander.id,
        skylander.name,
        skylander.type,
        skylander.game,
        skylander.link,
        obtained
      )
      copy.push(updated)

      if (obtained) coll++
    })

    copy.sort(function (a, b) {
      return a.id - b.id
    })
    setSkylanders(copy)
    setCollected(coll)
  }

  const setSkylanderToObtained = (id: number): void => {
    const json = localStorage.getItem('landertracker')
    if (json != null && json != undefined) {
      const ud = JSON.parse(json)
      ud.items.forEach((item: { id: number; obtained: boolean }) => {
        if (item.id == id) {
          if (item.obtained == false) {
            item.obtained = true
          } else {
            item.obtained = false
          }
        }
      })

      localStorage.setItem('landertracker', JSON.stringify(ud))
      reloadSkylanders()
    }
  }

  useEffect(() => {
    checkForUserData()
    getSkylanders()
    console.log('Start')
  }, [])

  return (
    <Box>
      <Box
        w="100vw"
        h={8}
        color="white"
        pos="fixed"
        top="0"
        zIndex={1}
        bgColor={'#242424'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Text fontSize={14}>Total: {collected}</Text>
      </Box>
      <SimpleGrid
        spacing={2}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        padding={4}
        marginTop={4}
      >
        {skylanders.map((skylander) => {
          return (
            <Card
              bgColor={skylander.obtained ? 'green.200' : '#363636'}
              key={skylander.id}
              cursor={'pointer'}
              color={skylander.obtained ? 'black' : 'white'}
              onClick={() => setSkylanderToObtained(skylander.id)}
              pos="relative"
            >
              <Box pos="absolute" padding={2}>
                <Text
                  fontSize={20}
                  fontWeight={600}
                  textShadow={skylander.obtained ? '2px 2px #FFF' : '2px 2px #000'}
                >
                  {skylander.name}
                </Text>
                <Text w="5rem" textShadow={skylander.obtained ? '2px 2px #FFF' : '2px 2px #000'}>
                  {skylander.game}
                </Text>
              </Box>
              <CardBody
                display={'flex'}
                flexDir="column"
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Image
                  src={`https://eoakdlw8zm.ufs.sh/f/${skylander.link}`}
                  maxW="100px"
                  maxH="100px"
                />
              </CardBody>
            </Card>
          )
        })}
      </SimpleGrid>
    </Box>
  )
}

export default SkylanderGrid
