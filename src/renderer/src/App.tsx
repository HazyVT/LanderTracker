import { Box } from '@chakra-ui/react'
import SkylanderGrid from './components/SkylanderGrid'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App(): JSX.Element {
  return (
    <Box bgColor="#242424">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SkylanderGrid />} />
        </Routes>
      </BrowserRouter>
    </Box>
  )
}

export default App
