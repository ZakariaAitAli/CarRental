import { Col, Row, User, Text, Tooltip } from '@nextui-org/react';
import React from 'react';
import { DeleteIcon } from '../icons/table/delete-icon';
import { EditIcon } from '../icons/table/edit-icon';
import { EyeIcon } from '../icons/table/eye-icon';
import { users } from './data';
import { IconButton, StyledBadge } from './table.styled';

interface Props {
   user: typeof users[number];
   columnKey: string | React.Key;
}

export const RenderCell = ({ user, columnKey }: Props) => {
   // @ts-ignore
   const cellValue = user[columnKey];
   switch (columnKey) {
      case 'nom':
         return (
            <User squared src={'images/avatar.png'} name={user.nom + " " + user.prenom} css={{ p: 0 }}>
               {user.email}
            </User>
         );
      case 'role':
         return (
            <Col>
               <Row>
                  <Text b size={14} css={{ tt: 'capitalize' }}>
                     {"Manager"}
                  </Text>
               </Row>
               <Row>
                  <Text
                     b
                     size={13}
                     css={{ tt: 'capitalize', color: '$accents7' }}
                  >
                     {/* {user.team} */}
                     {"ENSA"}
                  </Text>
               </Row>
            </Col>
         );
      case 'status':
         return (
            // @ts-ignore
            <StyledBadge type={String(user.status)}>{"Finished"}</StyledBadge>
         );
      default:
         return cellValue;
   }
};
