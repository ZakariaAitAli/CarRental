import { Avatar, Dropdown, Navbar, Text } from '@nextui-org/react';
import React from 'react';
import { DarkModeSwitch } from './darkmodeswitch';
import { Button } from '@nextui-org/react';
import { getAuth, signOut } from 'firebase/auth';


export const UserDropdown = () => {
   const sign_out = () => {
      const auth = getAuth();
      signOut(auth).then(() => {
         console.log("Sign out successfully");
         window.location.href = "/";
      })

   }
   return (
      <Dropdown placement="bottom-right">
         <Navbar.Item>
            <Dropdown.Trigger>
               <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="md"
                  src="images/avatar.png"
               />
            </Dropdown.Trigger>
         </Navbar.Item>
         <Dropdown.Menu
            aria-label="User menu actions"
            onAction={(actionKey) => console.log({ actionKey })}
         >
            <Dropdown.Item key="Home" withDivider>Home</Dropdown.Item>
            <Dropdown.Item key="logout" withDivider color="error">
               <Button light onPress={sign_out}>
                  Log Out
               </Button>
            </Dropdown.Item>
            <Dropdown.Item key="switch" withDivider>
               <DarkModeSwitch />
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
};
