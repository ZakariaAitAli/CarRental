import React, { useState } from 'react';
import { Card, Text, Image, Spacer } from '@nextui-org/react';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { Breadcrumbs, Crumb, CrumbLink } from '../breadcrumb/breadcrumb.styled';
import { DotsIcon } from '../icons/accounts/dots-icon';
import { ExportIcon } from '../icons/accounts/export-icon';
import { InfoIcon } from '../icons/accounts/info-icon';
import { TrashIcon } from '../icons/accounts/trash-icon';
import { HouseIcon } from '../icons/breadcrumb/house-icon';
import { UsersIcon } from '../icons/breadcrumb/users-icon';
import { SettingsIcon } from '../icons/sidebar/settings-icon';
import { Flex } from '../styles/flex';
import { TableWrapper } from '../table/table';
import { EditCar } from './edit-car';
import { AddReservation } from './add-reservation';
import { useEffect } from 'react';

export const CarCard1 = ({ car }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const ariaLabel = `${car.brand} ${car.model}, Year: ${car.year}, Color: ${car.color}`;

  return (
    <Flex
      css={{ gap: '$8' }}
      align={'center'}
      justify={'between'}
      wrap={'wrap'}
    >
      <Card
        shadow
        css={{
          width: '250px',
          padding: '16px',
          borderRadius: '8px',
        }}
        aria-label={ariaLabel}
      >
        <Image
          src={`images/${car.id}.jpg`}
          objectFit="cover"
          width="100%"
          height="190px"
          alt={car.title}
        />

        <Text h4>{car.marque}</Text>
        <Text>{car.modele}</Text>
        <Text>{car.annee}</Text>
        <Text>availability : {car.disponibilite}</Text>
        <Spacer x={0.5} />
      </Card>
    </Flex>
  );
};
