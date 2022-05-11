import { VStack, HStack, Flex, Spacer } from "@chakra-ui/layout"
import { IconButton } from "@chakra-ui/button"
import { useColorMode } from "@chakra-ui/color-mode"
import React from "react"

import Navbar from "./components/Navbar"
import Routes from "./Routes"
import { FaSun, FaMoon } from "react-icons/fa"

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === "dark"
  return (
    <div>
      <VStack p={5}>
        <HStack>
          <Navbar />
          <IconButton
            ml="8"
            icon={isDark ? <FaSun /> : <FaMoon />}
            isRound={true}
            onClick={toggleColorMode}
          ></IconButton>
        </HStack>
        <Routes />
      </VStack>
    </div>
  )
}

export default App
