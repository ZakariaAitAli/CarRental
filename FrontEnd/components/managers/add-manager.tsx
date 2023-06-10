import { Button, Divider, Input, Modal, Text } from '@nextui-org/react';
import React from 'react';
import { Flex } from '../styles/flex';
import { useState } from 'react';

export const AddManager = () => {
   const [visible, setVisible] = React.useState(false);
   const handler = () => setVisible(true);

   const closeHandler = () => {
      setVisible(false);
      console.log('closed');
   };

   const [nom_complet, setNom_complet] = useState('');
   const [nom_utilisateur, setNom_utilisateur] = useState('');
   const [email, setEmail] = useState('');
   const [mot_de_passe, setMot_de_passe] = useState('');

   async function handleUser() {
      const response = await fetch(
         "http://127.0.0.1:8000/managers/",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `nom_complet=${nom_complet}&nom_utilisateur=${nom_utilisateur}&mot_de_passe=${mot_de_passe}&email=${email}`,
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
         <Button auto onClick={handler}>
            Add Manager
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
                  Add new user
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
                  Add Manager
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
};
