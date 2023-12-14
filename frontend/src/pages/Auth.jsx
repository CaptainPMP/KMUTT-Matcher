import React, {useEffect} from 'react'
import { Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Login from './Login';
import Register from './Register';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('userInfo'));

      if (user) navigate('/home')
    },[navigate])
    return (
        // <div>
        //   <nav>
        //       <Button dest="/login">Login</Button>
        //       <Button dest="/register">Register</Button>
        //     </nav>
        //     <div className="container p-4">
    
        //         <Button dest="/home">Start match your close MBTI friends</Button>
        //     </div>
        // </div>
    
        <Container>
          {/* <Navbar /> */}
          <Box
            d="flex"
            justifyContent="center"
            p={3}
            bg="white"
            w="100%"
            m="40px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
          >
            <Text fontSize="4xl">KMUTT Matcher</Text>
          </Box>
          <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
            <Tabs variant='soft-rounded' >
              <TabList>
                <Tab width="50%">Login</Tab>
                <Tab width="50%">Sign Up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Login />
                </TabPanel>
                <TabPanel>
                  <Register />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
          
          {/* <div className="container mx-auto mt-8 text-center">
            <h1 className="text-4xl font-bold mb-4">KMUTT Matcher</h1>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Odio ut sem nulla pharetra.
            </p>
            <Link to="/home" className="bg-blue-500 text-white px-4 py-2 rounded">Go to homepage</Link>
          </div> */}
        </Container>
      )
}

export default Auth