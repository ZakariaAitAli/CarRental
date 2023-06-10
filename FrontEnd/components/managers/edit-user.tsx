import { Button, Divider, Input, Modal, Text, Dropdown } from '@nextui-org/react';
import React, { useState } from 'react';
import { Flex } from '../styles/flex';

export const EditUser = ({ user }) => {
   const [visible, setVisible] = useState(false);
   const handler = () => setVisible(true);

   const closeHandler = () => {
      setVisible(false);
      console.log('closed');
   };

   const [nom_complet, setNom_complet] = useState(user.nom_complet);
   const [nom_utilisateur, setNom_utilisateur] = useState(user.nom_utilisateur);
   const [email, setEmail] = useState(user.email);
   const [mot_de_passe, setMot_de_passe] = useState('');

   async function handleUser() {

      const response = await fetch(
         "http://127.0.0.1:8000/update_manager/",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `id=${user.id}&nom_complet=${nom_complet}&nom_utilisateur=${nom_utilisateur}&mot_de_passe=${mot_de_passe}&email=${email}`,
         }
      );

      // Reset the input fields
      setNom_complet('');
      setNom_utilisateur('');
      setMot_de_passe('');
      setEmail('');

      // Close the modal
      setVisible(false);

      // Refresh the page
      window.location.reload();
   };

   return (
      <div>
         <Button
            auto
            css={{ padding: "$4" }}
            light
            onClick={handler}
         >
            Edit
            <svg
               width={24}
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-6 h-6"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
               />
            </svg>
         </Button>
         <Modal
            closeButton
            aria-labelledby="modal-title"
            width="600px"
            open={visible}
            onClose={closeHandler}
         >
            <Modal.Header css={{ justifyContent: 'start' }}>
               <Text id="modal-title" h4>
                  Edit user
               </Text>
            </Modal.Header>
            <Divider css={{ my: '$5' }} />
            <Modal.Body css={{ py: '$10' }}>
               <Flex
                  direction={'column'}
                  css={{
                     'flexWrap': 'wrap',
                     'gap': '$8',
                     '@lg': { flexWrap: 'nowrap', gap: '$12' },
                  }}
               >
                  <Flex
                     css={{
                        'gap': '$10',
                        'flexWrap': 'wrap',
                        '@lg': { flexWrap: 'nowrap' },
                     }}
                  >
                     <Input
                        value={nom_utilisateur}
                        onChange={(e) => setNom_utilisateur(e.target.value)}
                        label="Username"
                        clearable
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Username"
                     />
                  </Flex>
                  <Flex
                     css={{
                        'gap': '$10',
                        'flexWrap': 'wrap',
                        '@lg': { flexWrap: 'nowrap' },
                     }}
                  >
                     <Input
                        value={nom_complet}
                        onChange={(e) => setNom_complet(e.target.value)}
                        label="Full Name"
                        bordered
                        clearable
                        fullWidth
                        size="lg"
                        placeholder="Full Name"
                     />
                  </Flex>

                  <Flex
                     css={{
                        'gap': '$10',
                        'flexWrap': 'wrap',
                        '@lg': { flexWrap: 'nowrap' },
                     }}
                  >
                     <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        clearable
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Email"
                     />
                  </Flex>
               </Flex>
            </Modal.Body>
            <Divider css={{ my: '$5' }} />
            <Modal.Footer>
               <Button auto onClick={handleUser}>
                  Edit User
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
};
