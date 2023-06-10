import React from 'react';
import { Flex } from '../styles/flex';
import { ReservationCard } from './ReservationCard';
import { Breadcrumbs, Crumb, CrumbLink } from '../breadcrumb/breadcrumb.styled';
import { HouseIcon } from '../icons/breadcrumb/house-icon';
import { ProductsIcon } from '../icons/sidebar/products-icon';
import { Text } from '@nextui-org/react';
import Link from 'next/link';
import {TableWrapper} from '../table-reservations/table';

export const Reservations = () => {

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
               <CrumbLink href="#">Reservations</CrumbLink>
               <Text>/</Text>
            </Crumb>
            <Crumb>
               <CrumbLink href="#">List</CrumbLink>
            </Crumb>
         </Breadcrumbs>
         <Flex direction="row" css={{ gap: '$6' }} wrap="wrap">
            <Text h3>All Reservations</Text>
         </Flex>
         <TableWrapper />
      </Flex>
   );
};
