import { Card, Text } from '@nextui-org/react';
import React from 'react';
import { Community } from '../icons/community';
import { Box } from '../styles/box';
import { Flex } from '../styles/flex';
import { useEffect, useState } from 'react';


export const CardBalance3 = () => {
   const [data, setData] = useState([]);

   useEffect(() => {
      async function fetchData() {
         const response = await fetch(
            "http://127.0.0.1:8000/calculer_somme_managers/"
         );
         const json = await response.json();
         setData(json);
      }
      fetchData();
   }, []);

   return (
      <Card
         css={{
            mw: '375px',
            bg: '$green600',
            borderRadius: '$xl',
            px: '$6',
         }}
      >
         <Card.Body css={{ py: '$10' }}>
            <Flex css={{ gap: '$5' }}>
               <Community />
               <Flex direction={'column'}>
                  <Text span css={{ color: 'white' }}>
                     Managers Stats
                  </Text>
                  <Text span css={{ color: 'white' }} size={'$xs'}>
                     {data} Managers
                  </Text>
               </Flex>
            </Flex>
            <Flex css={{ gap: '$6', py: '$4' }} align={'center'}>
               <Text
                  span
                  size={'$xl'}
                  css={{ color: 'white' }}
                  weight={'semibold'}
               >
                  {data} Managers
               </Text>
               <Text span css={{ color: '$red600' }} size={'$xs'}>
                  + 4.5%
               </Text>
            </Flex>
            <Flex css={{ gap: '$12' }} align={'center'}>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{ color: '$red600' }}
                     weight={'semibold'}
                  >
                     {'↓'}
                  </Text>
                  <Text span size={'$xs'} css={{ color: '$white' }}>
                     {/* 100,930 USD */}
                  </Text>
               </Box>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{ color: '$red600' }}
                     weight={'semibold'}
                  >
                     {'↑'}
                  </Text>
                  <Text span size={'$xs'} css={{ color: '$white' }}>
                     {/* 54,120 USD */}
                  </Text>
               </Box>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{ color: '$green600' }}
                     weight={'semibold'}
                  >
                     {'⭐'}
                  </Text>
                  <Text span size={'$xs'} css={{ color: '$white' }}>
                     {/* 125 VIP */}
                  </Text>
               </Box>
            </Flex>
         </Card.Body>
      </Card>
   );
};
