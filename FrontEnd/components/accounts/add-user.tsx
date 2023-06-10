import {Button, Divider, Input, Modal, Text} from '@nextui-org/react';
import React from 'react';
import {Flex} from '../styles/flex';
import {useState} from 'react';

export const AddUser = () => {
   const [visible, setVisible] = React.useState(false);
   const handler = () => setVisible(true);

   const closeHandler = () => {
      setVisible(false);
      console.log('closed');
   };

   const [nom, setNom] = useState('');
   const [prenom, setPrenom] = useState('');
   const [adresse, setAdresse] = useState('');
   const [email, setEmail] = useState('');

   async function handleUser ()  {
      // Perform the necessary logic
      console.log('Last name:', nom);
      console.log('First name:', prenom);
      console.log('Address:', adresse);
      console.log('Email:', email);

      const response = await fetch(
         "http://127.0.0.1:8000/insert_client/",
         {
             method: "POST",
               headers: {
                   "Content-Type": "application/x-www-form-urlencoded",
               },
               body: `nom=${nom}&prenom=${prenom}&adresse=${adresse}&email=${email}`,
         }
      );

      // Reset the input fields
      setNom('');
      setPrenom('');
      setAdresse('');
      setEmail('');

      // Close the modal
      setVisible(false);

      // Refresh the page
      window.location.reload();
   };


   return (
      <div>
         <Button auto onClick={handler}>
            Add User
         </Button>
         <Modal
            closeButton
            aria-labelledby="modal-title"
            width="600px"
            open={visible}
            onClose={closeHandler}
         >
            <Modal.Header css={{justifyContent: 'start'}}>
               <Text id="modal-title" h4>
                  Add new user
               </Text>
            </Modal.Header>
            <Divider css={{my: '$5'}} />
            <Modal.Body css={{py: '$10'}}>
               <Flex
                  direction={'column'}
                  css={{
                     'flexWrap': 'wrap',
                     'gap': '$8',
                     '@lg': {flexWrap: 'nowrap', gap: '$12'},
                  }}
               >
                  <Flex
                     css={{
                        'gap': '$10',
                        'flexWrap': 'wrap',
                        '@lg': {flexWrap: 'nowrap'},
                     }}
                  >
                     <Input
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        label="First Name"
                        bordered
                        clearable
                        fullWidth
                        size="lg"
                        placeholder="First Name"
                     />
                     <Input
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        label="Last Name"
                        clearable
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Last Name"
                     />
                  </Flex>

                  <Flex
                     css={{
                        'gap': '$10',
                        'flexWrap': 'wrap',
                        '@lg': {flexWrap: 'nowrap'},
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
                  <Flex
                     css={{
                        'gap': '$10',
                        'flexWrap': 'wrap',
                        '@lg': {flexWrap: 'nowrap'},
                     }}
                  >
                     <Input
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                        label="Address"
                        clearable
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Address"
                     />
                  </Flex>
               </Flex>
            </Modal.Body>
            <Divider css={{my: '$5'}} />
            <Modal.Footer>
               <Button auto onClick={handleUser}>
                  Add User
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
};
