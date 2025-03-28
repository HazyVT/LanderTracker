import { Box, Card, CardBody, Heading, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { supabase } from './components/Database'
import Skylander from './components/Skylander'
import { useEffect, useState } from 'react'
import { checkForUserData, loadUserData } from './components/Storage'

type userDataType = {
  items: [
    { id: number, obtained: boolean}
  ]
}


function App(): JSX.Element {
  //const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [skylanders, setSkylanders] = useState<Skylander[]>([])
  const [ storage, setStorage ] = useState<userDataType>();

  const getSkylanders = async (): Promise<void> => {

    const json = localStorage.getItem('landertracker');
    const userData = JSON.parse(json ? json : '');
    if (json != null && json != undefined) {
      setStorage(userData);
    }

    const { data, error } = await supabase
      .from('skylanders')
      .select('id, name, type ( name ), image, game ( name )')
    if (error == null) {
      const newArray: Skylander[] = []
      data.forEach((value) => {
        const skylander = new Skylander(value.id, value.name, value.type.name, value.game.name, value.image, userData.items[value.id-1].obtained)
        newArray.push(skylander)
      })

      setSkylanders(newArray)
    }
  }

  const setSkylanderToObtained = (id: number) => {
    const json = localStorage.getItem('landertracker');
    if (json != null && json != undefined) {
      const ud = JSON.parse(json);
      ud.items.forEach((item) => {
        if (item.id == id) {
          if (item.obtained == false) {
            item.obtained = true;
          } else {
            item.obtained = false;
          }
        }
      })

      localStorage.setItem('landertracker', JSON.stringify(ud));
      getSkylanders();
    }
  }

  useEffect(() => {
    checkForUserData();
    getSkylanders();
    console.log("Start");

  }, [])

  return (
    <Box>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {skylanders.map((skylander) => {
          return (
            <Card bgColor={skylander.obtained ? "green.200" : "white"} key={skylander.id} cursor={"pointer"} onClick={() => setSkylanderToObtained(skylander.id)}>
              <CardBody display={"flex"} flexDir="column" alignItems={"center"}>
                <Image src={`https://eoakdlw8zm.ufs.sh/f/${skylander.link}`} maxW="100px" maxH="100px" />
                <Text>{skylander.name}</Text>
              </CardBody>
            </Card>
          )
        })}
      </SimpleGrid>
      
    </Box>
  )
}

export default App
