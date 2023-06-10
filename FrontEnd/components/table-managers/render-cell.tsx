import { Col, Row, User, Text, Tooltip } from '@nextui-org/react';
import React from 'react';
import { DeleteIcon } from '../icons/table/delete-icon';
import { EditIcon } from '../icons/table/edit-icon';
import { EyeIcon } from '../icons/table/eye-icon';
import { users } from './data';
import { IconButton, StyledBadge } from './table.styled';
import { EditUser } from '../managers/edit-user';

interface Props {
   user: typeof users[number];
   columnKey: string | React.Key;
}

export const RenderCell = ({ user, columnKey }: Props) => {
   // @ts-ignore
   const cellValue = user[columnKey];
   switch (columnKey) {
      case 'nom_complet':
         return (
            <User squared src={'images/avatar.png'} name={user.nom_complet} css={{ p: 0 }}>
               {user.nom_utilisateur}
            </User>
         );
      case 'email':
         return (
            <Col>
               <Row>
                  <Text b size={14} css={{ tt: 'capitalize' }}>
                     {user.email}
                  </Text>
               </Row>
               <Row>
                  <Text
                     b
                     size={13}
                     css={{ tt: 'capitalize', color: '$accents7' }}
                  >
                     {/* {user.team} */}
                  </Text>
               </Row>
            </Col>
         );
      case 'status':
         return (
            // @ts-ignore
            <StyledBadge type={String(user.status)}>{"active"}</StyledBadge>
         );

      case 'actions':
         return (
            <Row
               justify="center"
               align="center"
               css={{ 'gap': '$8', '@md': { gap: 0 } }}
            >
               <Col css={{ d: 'flex' }}>
                  <Tooltip content="Edit user">
                     <IconButton
                        onClick={() => console.log('Edit user', user.id)}
                     >
                        <EditUser user={user} />
                     </IconButton>
                  </Tooltip>
               </Col>
               <Col css={{ d: 'flex' }}>
                  <Tooltip
                     content="Delete user"
                     color="error"
                     onClick={async (id) => {
                        try {
                           const response = await fetch(`http://127.0.0.1:8000/delete_manager/${user.id}/`);
                           if (response.ok) {
                              console.log('Client deleted:', id);
                              window.location.reload();
                           } else {
                              alert('Something went wrong!');
                           }
                        } catch (error) {
                           console.error('Failed to delete car:', error);
                        }
                     }}
                  >
                     <IconButton >
                        <DeleteIcon size={20} fill="#FF0080" />
                     </IconButton>
                  </Tooltip>
               </Col>
            </Row >
         );
      default:
         return cellValue;
   }
};
