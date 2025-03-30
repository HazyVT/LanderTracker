import { Box, SimpleGrid, Card, CardBody, Image, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { supabase } from "./Database";
import Skylander from "./Skylander";
import { loadUserData, checkForUserData } from "./Storage";

function SkylanderGrid() {
    //const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [skylanders, setSkylanders] = useState<Skylander[]>([])

  const getSkylanders = async (): Promise<void> => {

    const userData = loadUserData();

    const { data, error } = await supabase
      .from('skylanders')
      .select('id, name, type ( name ), image, game ( name )')
    if (error == null) {
      const newArray: Skylander[] = []
      data.forEach((value) => {
        //@ts-expect-error
        const skylander = new Skylander(value.id, value.name, value.type.name, value.game.name, value.image, userData.items[value.id-1].obtained)
        newArray.push(skylander)
      })

      setSkylanders(newArray)
    }
  }

  const reloadSkylanders = () => {
    const userData = loadUserData();

    const copy: Skylander[] = [];

    skylanders.forEach((skylander) => {
        const updated = new Skylander(skylander.id, skylander.name, skylander.type, skylander.game, skylander.link, userData.items[skylander.id-1].obtained);
        copy.push(updated);
    })

    setSkylanders(copy);
  }

  const setSkylanderToObtained = (id: number) => {
    const json = localStorage.getItem('landertracker');
    if (json != null && json != undefined) {
      const ud = JSON.parse(json);
      ud.items.forEach((item : { id: number, obtained: boolean}) => {
        if (item.id == id) {
          if (item.obtained == false) {
            item.obtained = true;
          } else {
            item.obtained = false;
          }
        }
      })

      localStorage.setItem('landertracker', JSON.stringify(ud));
      reloadSkylanders();
    }
  }

  useEffect(() => {
    checkForUserData();
    getSkylanders();
    console.log("Start");

  }, [])

  return (
    <Box>
      <SimpleGrid spacing={2} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' padding={4}>
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

export default SkylanderGrid;