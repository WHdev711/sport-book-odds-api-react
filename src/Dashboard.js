import React, { useEffect, useState, useMemo, Component } from 'react';
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import TableContainer from './TableContainer';
import { SelectColumnFilter } from './filters';

const Dashboard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const doFetch = async () => {
      // const headers = {'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'Basic QklBMDAwMzcxQjpWYXNjb2NhYnJvbjI0'}
      // const response = await fetch('https://randomuser.me/api/?results=100');
      const response = await fetch('http://localhost:8080/api/ps3838',{method:"GET"});
      console.log(response);
      // const response = await axios('https://api.ps3838.com/v3/odds?sportId=29',{ method: 'GET', headers:{'Authorization': 'Basic QklBMDAwMzcxQjpWYXNjb2NhYnJvbjI0'}});
      const body = await response.json();
      console.log(body);
      const fixtures = body.league;
      console.log(fixtures);
      
      setData(body);
    };
    doFetch();
  }, []);

  const renderRowSubComponent = (row) => {
    const {
      name: { first, last },
      location: { city, street, postcode },
      picture,
      cell,
    } = row.original;
    return (
      <Card style={{ width: '18rem', margin: '0 auto' }}>
        <CardImg top src={picture.large} alt='Card image cap' />
        <CardBody>
          <CardTitle>
            <strong>{`${first} ${last}`} </strong>
          </CardTitle>
        </CardBody>
      </Card>
    );
  };

  const columns = useMemo(
    () => [
      // {
      //   Header: () => null,
      //   id: 'expander', // 'id' is required
      //   Cell: ({ row }) => (
      //     <span {...row.getToggleRowExpandedProps()}>
      //       {row.isExpanded ? '👇' : '👉'}
      //     </span>
      //   ),
      // },
      {
        Header: 'Country',
        accessor: 'country',
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: 'equals',
      },
      {
        Header: 'Sport',
        accessor: 'sport',
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: 'equals',
      },
      {
        Header: 'League',
        accessor: 'league',
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: 'equals',
      },
      {
        Header: 'Home',
        accessor: 'homegame',
      },
      {
        Header: 'Away',
        accessor: 'awaygame',
      },
      {
        Header: 'Start',
        accessor: 'start',
        disableSortBy: false,

      },
      {
        Header: 'Releasetime',
        accessor: 'releasetime',
        disableSortBy: false,

      },
    
      // {
      //   Header: 'Hemisphere',
      //   accessor: (values) => {
      //     const { latitude, longitude } = values.location.coordinates;
      //     const first = Number(latitude) > 0 ? 'N' : 'S';
      //     const second = Number(longitude) > 0 ? 'E' : 'W';
      //     return first + '/' + second;
      //   },
      //   disableSortBy: true,
      //   Filter: SelectColumnFilter,
      //   filter: 'equals',
      //   Cell: ({ cell }) => {
      //     const { value } = cell;

      //     const pickEmoji = (value) => {
      //       let first = value[0]; // N or S
      //       let second = value[2]; // E or W
      //       const options = ['⇖', '⇗', '⇙', '⇘'];
      //       let num = first === 'N' ? 0 : 2;
      //       num = second === 'E' ? num + 1 : num;
      //       return options[num];
      //     };

      //     return (
      //       <div style={{ textAlign: 'center', fontSize: 18 }}>
      //         {pickEmoji(value)}
      //       </div>
      //     );
      //   },
      // },
    ],
    []
  );

  return (
    <Container style={{padding:30, display: 'block', maxWidth: '100%'}}>
      <TableContainer
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      />
    </Container>
  );
};

export default Dashboard;
