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
            <StyledBadge type={String(user.status)}>{"Waiting"}</StyledBadge>
         );

      case 'actions':
         return (
            <Row
               justify="center"
               align="center"
               css={{ 'gap': '$8', '@md': { gap: 0 } }}
            >
               <Col css={{ d: 'flex' }}>
                  <Tooltip content="Accept">
                     <IconButton
                        onClick={async () => {
                           await fetch(
                              "http://127.0.0.1:8000/accept_reservation/",
                              {
                                 method: "POST",
                                 headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                 },
                                 body: `id=${user.id}`,
                              }
                           );
                           window.location.reload();
                        }}
                     >
                        <EditIcon size={20} fill="#979797" />
                     </IconButton>
                  </Tooltip>
               </Col>
               <Col css={{ d: 'flex' }}>
                  <Tooltip
                     content="Delete"
                     color="error"
                     onClick={async () => {
                        await fetch(
                           "http://127.0.0.1:8000/refuse_reservation/",
                           {
                              method: "POST",
                              headers: {
                                 "Content-Type": "application/x-www-form-urlencoded",
                              },
                              body: `id=${user.id}`,
                           }
                        );
                        window.location.reload();
                     }}
                  >
                     <IconButton>
                        <DeleteIcon size={20} fill="#FF0080" />
                     </IconButton>
                  </Tooltip>
               </Col>
            </Row>
         );
      default:
         return cellValue;
   }
};
