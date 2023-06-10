import { Card, Text } from '@nextui-org/react';
import React from 'react';
import { Community } from '../icons/community';
import { Box } from '../styles/box';
import { Flex } from '../styles/flex';
import { useEffect, useState } from 'react';


export const CardBalance2 = () => {
   const [data, setData] = useState([]);
   useEffect(() => {
      async function fetchData() {
         const response = await fetch(
            "http://127.0.0.1:8000/calculer_somme_reservations/"
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
            bg: '$accents0',
            borderRadius: '$xl',
            px: '$6',
         }}
      >
         <Card.Body css={{ py: '$10' }}>
            <Flex css={{ gap: '$5' }}>
               <Community color={'$accents9'} />
               <Flex direction={'column'}>
                  <Text span css={{ color: '' }}>
                     Reservations Stats
                  </Text>
                  <Text span size={'$xs'}>
                     {data} Reservations
                  </Text>
               </Flex>
            </Flex>
            <Flex css={{ gap: '$6', py: '$4' }} align={'center'}>
               <Text span size={'$xl'} weight={'semibold'}>
                  {data} Reservations
               </Text>
               <Text span css={{ color: '$red600' }} size={'$xs'}>
                  {/* + 4.5% */}
               </Text>
            </Flex>
            <Flex css={{ gap: '$12' }} align={'center'}>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{ color: '$green600' }}
                     weight={'semibold'}
                  >
                     {'↓'}
                  </Text>
                  <Text span size={'$xs'}>
                     {/* 11,930 USD */}
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
                  <Text span size={'$xs'}>
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
                  <Text span size={'$xs'}>
                     {/* 150 VIP */}
                  </Text>
               </Box>
            </Flex>
         </Card.Body>
      </Card>
   );
};
