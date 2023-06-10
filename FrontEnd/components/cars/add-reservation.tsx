import { Button, Divider, Input, Modal, Text, Dropdown } from '@nextui-org/react';
import React, { useState } from 'react';
import { Flex } from '../styles/flex';

export const AddReservation = ({ car }) => {
   const [visible, setVisible] = useState(false);
   const handler = () => setVisible(true);

   const closeHandler = () => {
      setVisible(false);
      console.log('closed');
   };

   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');
   const [email, setEmail] = useState('');

   async function handleReservation() {
      // Perform the necessary logic
      console.log('Car:', car);
      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);
      console.log('Email:', email);

      const response = await fetch(
         "http://127.0.0.1:8000/insert_request_reservation/",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `id=${car.id}&email=${email}&date_debut=${startDate}&date_fin=${endDate}`,
         }
      );

      // Reset the input fields
      setStartDate('');
      setEndDate('');
      setEmail('');

      // Close the modal
      setVisible(false);

      // Refresh the page
      window.location.reload();
   }

   return (
      <div>
         <Button
            auto
            css={{ padding: "$0" }}
            light
            onClick={handler}
            color="success"
         >
            Reserve
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
                        onChange={(e) => setStartDate(e.target.value)}
                        label="Start Date"
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Start Date"
                        type="date"
                     />
                     <Input
                        onChange={(e) => setEndDate(e.target.value)}
                        label="End Date"
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="End Date"
                        type="date"
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
               <Button auto onClick={handleReservation}>
                  Send Request
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
};
