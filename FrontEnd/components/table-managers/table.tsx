import {Table} from '@nextui-org/react';
import React from 'react';
import {Box} from '../styles/box';
import {columns, users } from './data';
import {RenderCell} from './render-cell';
import {useEffect, useState} from 'react';

export const TableWrapper = () => {
   const [data, setData] = useState([]);
   useEffect(() => {
     async function fetchData() {
       const response = await fetch(
         "http://127.0.0.1:8000/managers/"
       );
       const json = await response.json();
       setData(json);
     }
     fetchData();
   }, []);
   
   const users =  data;

   return (
      <Box
         css={{
            '& .nextui-table-container': {
               boxShadow: 'none',
            },
         }}
      >
         <Table
            aria-label="Example table with custom cells"
            css={{
               height: 'auto',
               minWidth: '100%',
               boxShadow: 'none',
               width: '100%',
               px: 0,
            }}
            selectionMode="multiple"
         >
            <Table.Header columns={columns}>
               {(column) => (
                  <Table.Column
                     key={column.uid}
                     hideHeader={column.uid === 'actions'}
                     align={column.uid === 'actions' ? 'center' : 'start'}
                  >
                     {column.name}
                  </Table.Column>
               )}
            </Table.Header>
            <Table.Body items={users}>
               {(item) => (
                  <Table.Row>
                     {(columnKey) => (
                        <Table.Cell>
                           {RenderCell({user: item, columnKey: columnKey})}
                        </Table.Cell>
                     )}
                  </Table.Row>
               )}
            </Table.Body>
            <Table.Pagination
               shadow
               noMargin
               align="center"
               rowsPerPage={8}
               onPageChange={(page) => console.log({page})}
            />
         </Table>
      </Box>
   );
};
