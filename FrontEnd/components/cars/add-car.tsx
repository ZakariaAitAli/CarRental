import { Button, Divider, Input, Modal, Text, Dropdown } from '@nextui-org/react';
import React, { useState } from 'react';
import { Flex } from '../styles/flex';

export const AddCar = () => {
   const [visible, setVisible] = useState(false);
   const handler = () => setVisible(true);

   const closeHandler = () => {
      setVisible(false);
      console.log('closed');
   };

   const [marque, setMarque] = useState('');
   const [modele, setModele] = useState('');
   const [annee, setAnnee] = useState('');
   const [disponibilite, setDisponibilite] = useState('');

   const [selected, setSelected] = React.useState(new Set(["Availability"]));
   const selectedValue = React.useMemo(
      () => Array.from(selected).join(", ").replaceAll("_", " "),
      [selected]
   );

   async function handleCar ()  {
      disponibilite = selectedValue;

      // Perform the necessary logic
      console.log('Brand:', marque);
      console.log('Model:', modele);
      console.log('Year:', annee);
      console.log('Availability:', disponibilite);

      const response = await fetch(
         "http://127.0.0.1:8000/cars/",
         {
           method: "POST",
           headers: {
             "Content-Type": "application/x-www-form-urlencoded",
           },
           body: `marque=${marque}&modele=${modele}&disponibilite=${disponibilite}&annee=${annee}`,
         }
       );

      // Reset the input fields
      setMarque('');
      setModele('');
      setAnnee('');
      setDisponibilite('');

      // Close the modal
      setVisible(false);

      // Refresh the page  
      window.location.reload();
   };

   return (
      <div>
         <Button auto onClick={handler}>
            Add Car
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
                  Add new car
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
                        value={marque}
                        onChange={(e) => setMarque(e.target.value)}
                        label="Brand"
                        bordered
                        clearable
                        fullWidth
                        size="lg"
                        placeholder="Brand"
                     />
                     <Input
                        value={modele}
                        onChange={(e) => setModele(e.target.value)}
                        label="Model"
                        clearable
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Model"
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
                        value={annee}
                        onChange={(e) => setAnnee(e.target.value)}
                        label="Year"
                        clearable
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Year"
                     />
                  </Flex>
                  <Flex
                     css={{
                        'gap': '$10',
                        'flexWrap': 'wrap',
                        '@lg': { flexWrap: 'nowrap' },
                     }}
                  >
                     <Dropdown onSelect={(value) => setDisponibilite(selectedValue)}
                        value={disponibilite}>
                        <Dropdown.Button flat>{selectedValue}</Dropdown.Button>
                        <Dropdown.Menu
                           aria-label="Single selection actions"
                           color="secondary"
                           disallowEmptySelection
                           selectionMode="single"
                           selectedKeys={selected}
                           onSelectionChange={setSelected}
                        >
                           <Dropdown.Item key="true">True</Dropdown.Item>
                           <Dropdown.Item key="false">False</Dropdown.Item>
                        </Dropdown.Menu>
                     </Dropdown>
                  </Flex>
               </Flex>
            </Modal.Body>
            <Divider css={{ my: '$5' }} />
            <Modal.Footer>
               <Button auto onClick={handleCar}>
                  Add Car
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
};
