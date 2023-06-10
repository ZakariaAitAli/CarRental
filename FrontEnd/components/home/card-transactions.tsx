import { Avatar, Card, Text } from '@nextui-org/react';
import React from 'react';
import { Box } from '../styles/box';
import { Flex } from '../styles/flex';
import { useEffect, useState } from 'react';


export const CardTransactions = () => {
   const [data, setData] = useState([]);
   useEffect(() => {
      async function fetchData() {
         const response = await fetch(
            "http://127.0.0.1:8000/all_request/"
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
            height: 'auto',
            bg: '$accents0',
            borderRadius: '$xl',
            // alignContent: 'start',
            justifyContent: 'start',
            px: '$6',
         }}
      >
         <Card.Body css={{ py: '$10' }}>
            <Flex css={{ gap: '$5' }} justify={'center'}>
               <Text h3 css={{ textAlign: 'center' }}>
                  Requests
               </Text>
            </Flex>
            <Flex
               css={{ gap: '$6', py: '$4' }}
               // align={'center'}

               direction={'column'}
            >

               {data.map((item) => (
                  <>
                     <Flex css={{ gap: '$6' }} align={'center'} justify="between">
                        <Avatar
                           size="lg"
                           pointer
                           src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                           bordered
                           color="gradient"
                           stacked
                        />
                        <Text span size={'$base'} weight={'semibold'}>
                           {item.prenom}
                        </Text>
                        <Text span css={{ color: '$green600' }} size={'$xs'}>
                           {item.marque}
                        </Text>
                        <Text span css={{ color: '$accents8' }} size={'$xs'}>
                           {item.date_debut}
                        </Text>
                     </Flex >
                  </>

               ))}

            </Flex>
         </Card.Body>
      </Card>
   );
};
