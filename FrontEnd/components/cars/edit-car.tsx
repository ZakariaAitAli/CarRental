import { Button, Divider, Input, Modal, Text, Dropdown } from '@nextui-org/react';
import React, { useState } from 'react';
import { Flex } from '../styles/flex';

export const EditCar = ({ car }) => {
   const [visible, setVisible] = useState(false);
   const handler = () => setVisible(true);

   const closeHandler = () => {
      setVisible(false);
      console.log('closed');
   };

   const [marque, setMarque] = useState(car.marque);
   const [modele, setModele] = useState(car.modele);
   const [annee, setAnnee] = useState(car.annee);
   const [disponibilite, setDisponibilite] = useState(car.disponibilite);

   const [selected, setSelected] = React.useState(new Set([car.disponibilite]));
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
         "http://127.0.0.1:8000/update_car/",
         {
           method: "POST",
           headers: {
             "Content-Type": "application/x-www-form-urlencoded",
           },
           body: `id=${car.id}&marque=${marque}&modele=${modele}&disponibilite=${disponibilite}&annee=${annee}`,
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
                  Edit Car
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
};
