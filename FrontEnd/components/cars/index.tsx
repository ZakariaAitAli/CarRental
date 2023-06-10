import React from 'react';
import { Flex } from '../styles/flex';
import { CarCard} from './CarCard';
import { CarCard1} from './CarCard1';
import { Breadcrumbs, Crumb, CrumbLink } from '../breadcrumb/breadcrumb.styled';
import { HouseIcon } from '../icons/breadcrumb/house-icon';
import { ProductsIcon } from '../icons/sidebar/products-icon';
import { Text } from '@nextui-org/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AddCar } from './add-car';

export const Cars = () => {
   const [data, setData] = useState([]);
   useEffect(() => {
      async function fetchData() {
         const response = await fetch(
            "http://127.0.0.1:8000/cars/"
         );
         const json = await response.json();
         setData(json);
      }
      fetchData();
   }, []);

   const cars = data;

   const [available_cars, setAvailable_cars] = useState([]);
   useEffect(() => {
      async function fetchData() {
         const response = await fetch(
            "http://127.0.0.1:8000/cars_available/"
         );
         const json = await response.json();
         setAvailable_cars(json);
      }
      fetchData();
   }, []);



   return (
      <Flex
         css={{
            'mt': '$5',
            'px': '$6',
            '@sm': {
               mt: '$10',
               px: '$16',
            },
         }}
         justify={'center'}
         direction={'column'}
      >
         <Breadcrumbs>
            <Crumb>
               <HouseIcon />
               <Link href={'/'}>
                  <CrumbLink href="#">Home</CrumbLink>
               </Link>
               <Text>/</Text>
            </Crumb>

            <Crumb>
               <ProductsIcon />
               <CrumbLink href="#">Cars</CrumbLink>
               <Text>/</Text>
            </Crumb>
            <Crumb>
               <CrumbLink href="#">List</CrumbLink>
            </Crumb>
         </Breadcrumbs>
         <Text h3>Available Cars</Text>
         <Flex direction={'row'} css={{ gap: '$6' }} wrap={'wrap'}>
            <Flex css={{ justifyContent: 'flex-end', flex: '1' }}>
               <AddCar />
            </Flex>
         </Flex>
         <Flex css={{ gap: '$8' }} align={'center'} wrap={'wrap'}>
            {available_cars.map((car) => (
               <CarCard key={car.id} car={car} />
            ))}
         </Flex>
         <Text h3>All Cars</Text>
         <Flex css={{ gap: '$8' }} align={'center'} wrap={'wrap'}>
            {cars.map((car) => (
               <CarCard1 key={car.id} car={car} />
            ))}
         </Flex>
      </Flex>
   );
};
