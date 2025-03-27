import { Box, Button, Image, Text } from "@chakra-ui/react"
import { supabase } from "./components/Database"
import Skylander from "./components/Skylander"
import { useEffect, useState } from "react"

function App(): JSX.Element {
  //const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [ skylanders, setSkylanders ] = useState<Skylander[]>([]);
  
  const getSkylanders = async () => {
    const { data, error } = await supabase.from('skylanders').select('name, type, image, game ( name )');
    if (error == null) {
      const newArray : Skylander[] = [];
      data.forEach((value) => {
        const skylander = new Skylander(value.name, value.type, value.game.name, value.image);
        newArray.push(skylander);
      })

      setSkylanders(newArray);
    }
  }

  useEffect(() => {
    getSkylanders();
  }, [])

  return (
    <Box>
      {skylanders.map((value) => {
        return <Box key={value.name}>
            <Image src={`https://eoakdlw8zm.ufs.sh/f/${value.link}`} />
          </Box>
      })}
    </Box>
  )
}

export default App
