import React, { useEffect, useState, useMemo, Component } from 'react';
import {
    Container,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
} from 'reactstrap';
import TableContainer from '../TableContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SelectColumnFilter } from '../filters';

const Alert = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const doFetch = async () => {
            // const headers = {'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'Basic QklBMDAwMzcxQjpWYXNjb2NhYnJvbjI0'}
            // const response = await fetch('https://randomuser.me/api/?results=100');
            const response = await fetch('http://localhost:8080/api/ps3838/getalert', { method: "GET" });
            console.log(response);
            // const response = await axios('https://api.ps3838.com/v3/odds?sportId=29',{ method: 'GET', headers:{'Authorization': 'Basic QklBMDAwMzcxQjpWYXNjb2NhYnJvbjI0'}});
            const body = await response.json();
            console.log(body);
            const fixtures = body.data;
            console.log(fixtures);

            setData(fixtures);
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
    const handleDelete = async (id) => {
        await fetch(`http://localhost:8080/api/ps3838/DeleteAlert/${id}`, { method: "DELETE" });
        // setData(data);
    }

    const handleEdit = (row) => {
        console.log(row);
    }
    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'League',
                accessor: 'league',

            },
            {
                Header: 'Country',
                accessor: 'country',
            },
            {
                Header: 'Clubname',
                accessor: 'clubname',
            },
            {
                Header: 'Action',
                accessor: 'id',
                Cell: ({row}) => (
                    <div>
                        <button onClick={() => handleEdit(row)}>Edit</button>
                        <button onClick={() => handleDelete(row.values.id)}>Delete</button>
                    </div>)
            },
        ],
        []
    );

    return (
        <Container style={{ padding: 30, display: 'block', maxWidth: '100%' }}>
            <TableContainer
                columns={columns}
                data={data}
                renderRowSubComponent={renderRowSubComponent}
            />
        </Container>
    );
};

export default Alert;
