import { Box, Button, Flex, Icon, Image, Input, Text, VStack } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react/field";
import { keyframes } from "@emotion/react";
import { useState } from "react";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Form, redirect } from 'react-router-dom';
import Logo_hpcl from '../../../assets/hpcl.png';
import Bg_image from '../../../assets/Pngtree—a large oil refinery at.jpg';



const float = keyframes`
  0% { transform: translateY(-10px); }
  50% { transform: translateY(10px); }
  100% { transform: translateY(-10px); }
`;

export default function LoginForm() {
   const [show, setShow] = useState(false);
  return (
      <Flex 
        position="fixed"
        inset={0}
        direction='column'  
        align='center' 
        justify='center'
        minH='100vh'
        bgImage={`url(${Bg_image})`}
        bgSize='cover'
        bgPos='center'
        bgRepeat='no-repeat'
        overflow="hidden">

        <VStack 
          minW="480px"
          maxH="90vh"
          gap={8}
          align="center"
          justify="center"
          bg="rgba(255, 255, 255, 0.05)"
          backdropFilter="blur(18px)"
          borderRadius="xl"
          boxShadow="lg"
          p={6}
        >
          <Image
            src={Logo_hpcl}
            alt="HPCL"
            boxSize="128px"
            animation={`${float} 2s ease-in-out infinite`}
          />            
          <Text textStyle="subheading" textAlign="center">Enter Credentials</Text>        
          <Form method="post" action="." style={{ width: "100%" }}>
            <VStack 
              gap={5} 
              w='full' 
              align="center" 
              justify="center"
              mt={4}
              h='100%'>
              <Field.Root required w="80%" bg="transparent" >
                <Input
                  type='text'
                  name="userId"
                  autoComplete="username"
                  placeholder="Username"
                  h="60px"
                  bg="rgba(255,255,255,0.2)"
                  borderRadius="xl"
                  backdropFilter="blur(12px)"
                  color="white"
                  fontSize="2xl"
                  _placeholder={{
                    color: "gray.50",
                    fontSize: "1.5rem",
                    fontWeight: "medium",
                  }}
                  _focus={{
                          outline: "2px solid",
                          outlineColor: "brand.500",
                          boxShadow: "none",
                        }}
                />
              </Field.Root>
              <Field.Root required w="80%" bg="transparent">
                <Box position="relative" w="full" >
                  <Input
                    type={show ? 'text' : 'password'}
                    name="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    h="60px"
                    pr="1.5rem"
                    borderRadius="xl"
                    bg="rgba(255,255,255,0.2)"
                    backdropFilter="blur(12px)"
                    color="white"
                    fontSize="2xl"
                    _placeholder={{
                      color: "gray.50",
                      fontSize: "1.5rem",
                      fontWeight: "medium",
                    }}
                    _focus={{
                      outline: "2px solid",
                      outlineColor: "brand.500",
                      boxShadow: "0 0 0 3px rgba(66,153,225,0.6)",
                    }}
                  />
                  
                  <Box position="absolute" right="1rem" top="50%" transform="translateY(-50%)" pointerEvents="none">
                    <Icon
                      as={show ? FiEyeOff : FiEye}
                      boxSize="1.5rem"
                      p={0}
                      display="inline-block"
                      lineHeight={0}
                      aria-label={show ? 'Hide password' : 'Show password'}
                      role="button"
                      tabIndex={0}
                      cursor="pointer"
                      color="gray.100"
                      pointerEvents="auto"
                      transition= "transform 200ms ease"
                      onClick={() => setShow(s => !s)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setShow(s => !s);
                        }
                      }}
                      _hover={{ transform: 'scale(1.20)' }}
                      _active={{ transform: 'scale(0.96)' }}
                      _focus={{ boxShadow: 'none', outline: 'none' }}
                    />
                  </Box>
                </Box>
              </Field.Root>
              <Button variant='primary' type="submit" size='xl'>LOGIN</Button>
              <Button variant='minimal' type="button" size='md'>Forgot Password?</Button>
            </VStack>
          </Form>            
        </VStack>
      </Flex>
  );
}

export const createAction =async ({request}) => {
  const  data= await request.formData();

  const task={
    userId: data.get('userId'),
    password: data.get('password')
  }
  console.log(task);

  return redirect('/');
}
