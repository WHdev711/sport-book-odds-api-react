import React, { useEffect, useState, useMemo, Component, Dialog } from 'react';
import {
    Container,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,

} from 'reactstrap';
import { Modal, Form } from 'react-bootstrap';
import TableContainer from '../TableContainer';
import { SelectColumnFilter } from '../filters';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Alert = () => {
    const [data, setData] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
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
    const handleDelete = (id) => {
        console.log(id);
        console.log(data);
        
        axios.delete(`http://localhost:8080/api/ps3838/DeleteAlert/${id}`)
        .then((res) => {
            console.log(res);
            if (res.data.message === "deleted") {
                console.log("success")
                window.location.reload();                
                // setData(data.filter(item => item.id !== id));
                // warningflagState(true);
                // setShow(false);
                // senddata.id = res.data.id;
                // setData(_tempData => [..._tempData, senddata]);

            }
            else {
                console.log(res.data.message);
                // warningState(res.data.message);
                // warningflagState(false);
            }

        }).catch((error) => {
            console.log(error)
        });
    }
    const EditDialog = (_editdata) => {
        console.log(_editdata.row);
        const _tmpedit = _editdata.row.values;
        const [show, setShow] = useState(false);
        const [ctflag, ctflagState] = useState(false);
        const [cnflag, cnflagState] = useState(false);
        const [lgflag, lgflagState] = useState(false);
        const [warningflag, warningflagState] = useState(true);
        const [warning, warningState] = useState('');
        const handleClose = () => setShow(false);
        const handleShow = () => {
            setShow(true)
            namesetState(_tmpedit.name);
            emailsetState(_tmpedit.email);
            countrysetState(_tmpedit.country);
            leaguesetState(_tmpedit.league);
            clubnamesetState(_tmpedit.clubname);
            if (_tmpedit.league.length >0 ) {
                countrysetState('');
                clubnamesetState('');
                ctflagState(true);
                cnflagState(true);
            }
            if (_tmpedit.country.length > 0 || _tmpedit.clubname.length > 0) {
                leaguesetState('');
                lgflagState(true);
            }
            warningState('');
            warningflagState(true);
        };

        const [name, namesetState] = useState("");
        const namehandleChange = (e) => namesetState(e.target.value);


        const [email_value, emailsetState] = useState("");
        const emailhandleChange = (e) => emailsetState(e.target.value);
        // var email_value = ""
        // const emailhandleChange = (e) => {
        //     email_value = e.target.value;
        //   };


        const [league, leaguesetState] = useState("");
        const leaguehandleChange = (e) => {
            leaguesetState(e.target.value)
            if (e.target.value.length > 0) {
                countrysetState('');
                clubnamesetState('');
                ctflagState(true);
                cnflagState(true);
            }
            else {
                ctflagState(false);
                cnflagState(false);
            }
        };


        const [country, countrysetState] = useState("");
        const countryhandleChange = (e) => {
            countrysetState(e.target.value)
            if (e.target.value.length > 0) {
                leaguesetState('');
                lgflagState(true);
            }
            else {
                lgflagState(false);
            }
        };


        const [clubname, clubnamesetState] = useState("");
        const clubnamehandleChange = (e) => {
            clubnamesetState(e.target.value)
            if (e.target.value.length > 0) {
                leaguesetState('');
                lgflagState(true);
            }
            else {
                lgflagState(false);
            }
        };

        const handleSave = (e) => {
            e.preventDefault();
            var ele = document.getElementById("save_form");
            var chk_status = ele.checkValidity();
            ele.reportValidity();
            if (chk_status) {
                console.log("this is check status");
                var senddata = {
                    name: name,
                    email: email_value,
                    league: league,
                    country: country,
                    clubname: clubname,
                };
                axios.put(`http://localhost:8080/api/ps3838/addalert/${_tmpedit.id}`, senddata)
                    .then((res) => {
                        console.log(res);
                        if (res.data.message === "success") {
                            console.log("success")
                            warningflagState(true);
                            setShow(false);
                            window.location.reload();
                        }
                        else {
                            console.log(res.data.message);
                            warningState(res.data.message);
                            warningflagState(false);
                        }

                    }).catch((error) => {
                        console.log(error)
                    });
            }
        };
        return (
            <>
                <Button variant="primary" className='btn btn-secondary float-right' onClick={handleShow}>
                    Edit Alert
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Form id="save_form">
                        <Modal.Header closeButton>
                            <Modal.Title>Add/Edit Alert Rule</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group  >
                                <Form.Label>Name: </Form.Label>
                                <Form.Control type="text" required={true} onChange={namehandleChange} value={name} placeholder="Please input name" />
                                <Form.Text hidden={warningflag} style={{ color: 'red' }} >{warning}</Form.Text >
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email: </Form.Label>
                                <Form.Control type="email" required={true} onChange={emailhandleChange} value={email_value} placeholder="Please input email" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>League: </Form.Label>
                                <Form.Control type="text" required={true} onChange={leaguehandleChange} value={league} disabled={lgflag} placeholder="Please input league" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Country: </Form.Label>
                                <Form.Control type="text" required={true} onChange={countryhandleChange} value={country} disabled={ctflag} placeholder="Please input country" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Clubname: </Form.Label>
                                <Form.Control type="text" required={true} onChange={clubnamehandleChange} value={clubname} disabled={cnflag} placeholder="Please input clubname" />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type="submit" variant="primary" onClick={handleSave}>
                                Save Changes
                            </Button>
                        </Modal.Footer>

                    </Form>
                </Modal>
            </>
        );
    }
    const handleEdit = (row) => {
        console.log(row);
        console.log(data);
        
        axios.put(`http://localhost:8080/api/ps3838/addalert/${row.id}`, row)
        .then((res) => {
            console.log(res);
            if (res.data.message === "success") {
                console.log("success")
                // window.location.reload();                
                // setData(data.filter(item => item.id !== id));
                // warningflagState(true);
                // setShow(false);
                // senddata.id = res.data.id;
                // setData(_tempData => [..._tempData, senddata]);

            }
            else {
                console.log(res.data.message);
                // warningState(res.data.message);
                // warningflagState(false);
            }

        }).catch((error) => {
            console.log(error)
        });
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
                disableFilters: true,
                Filter: SelectColumnFilter,
                Cell: ({ row }) => (
                    <div>
                        <EditDialog row={row}/>
                        <button className='btn btn-danger' onClick={() => handleDelete(row.values.id)}>Delete</button>
                    </div>)
            },
        ],
        []
    );




    const AlertDialog = () => {
        const [show, setShow] = useState(false);
        const [ctflag, ctflagState] = useState(false);
        const [cnflag, cnflagState] = useState(false);
        const [lgflag, lgflagState] = useState(false);
        const [warningflag, warningflagState] = useState(true);
        const [warning, warningState] = useState('');
        const handleClose = () => setShow(false);
        const handleShow = () => {
            setShow(true)
            namesetState('');
            emailsetState('');
            countrysetState('');
            leaguesetState('');
            clubnamesetState('');
            warningState('');
            warningflagState(true);
        };

        const [name, namesetState] = useState("");
        const namehandleChange = (e) => namesetState(e.target.value);


        const [email_value, emailsetState] = useState("");
        const emailhandleChange = (e) => emailsetState(e.target.value);
        // var email_value = ""
        // const emailhandleChange = (e) => {
        //     email_value = e.target.value;
        //   };


        const [league, leaguesetState] = useState("");
        const leaguehandleChange = (e) => {
            leaguesetState(e.target.value)
            if (e.target.value.length > 0) {
                ctflagState(true);
                cnflagState(true)
            }
            else {
                ctflagState(false);
                cnflagState(false);
            }
        };


        const [country, countrysetState] = useState("");
        const countryhandleChange = (e) => {
            countrysetState(e.target.value)
            if (e.target.value.length > 0) {
                lgflagState(true);
            }
            else {
                lgflagState(false);
            }
        };


        const [clubname, clubnamesetState] = useState("");
        const clubnamehandleChange = (e) => {
            clubnamesetState(e.target.value)
            if (e.target.value.length > 0) {
                lgflagState(true);
            }
            else {
                lgflagState(false);
            }
        };

        const handleSave = (e) => {
            e.preventDefault();
            var ele = document.getElementById("save_form");
            var chk_status = ele.checkValidity();
            ele.reportValidity();
            if (chk_status) {
                console.log("this is check status");
                var senddata = {
                    name: name,
                    email: email_value,
                    league: league,
                    country: country,
                    clubname: clubname,
                };
                axios.post("http://localhost:8080/api/ps3838/addalert", senddata)
                    .then((res) => {
                        console.log(res);
                        if (res.data.message === "success") {
                            console.log("success")
                            warningflagState(true);
                            setShow(false);
                            senddata.id = res.data.id;
                            setData(_tempData => [..._tempData, senddata]);

                        }
                        else {
                            console.log(res.data.message);
                            warningState(res.data.message);
                            warningflagState(false);
                        }

                    }).catch((error) => {
                        console.log(error)
                    });
            }
        };
        return (
            <>
                <Button variant="primary" className='btn btn-secondary float-right mb-2' onClick={handleShow}>
                    Add Alert
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Form id="save_form">
                        <Modal.Header closeButton>
                            <Modal.Title>Add/Edit Alert Rule</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group  >
                                <Form.Label>Name: </Form.Label>
                                <Form.Control type="text" required={true} onChange={namehandleChange} value={name} placeholder="Please input name" />
                                <Form.Text hidden={warningflag} style={{ color: 'red' }} >{warning}</Form.Text >
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email: </Form.Label>
                                <Form.Control type="email" required={true} onChange={emailhandleChange} value={email_value} placeholder="Please input email" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>League: </Form.Label>
                                <Form.Control type="text" required={true} onChange={leaguehandleChange} value={league} disabled={lgflag} placeholder="Please input league" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Country: </Form.Label>
                                <Form.Control type="text" required={true} onChange={countryhandleChange} value={country} disabled={ctflag} placeholder="Please input country" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Clubname: </Form.Label>
                                <Form.Control type="text" required={true} onChange={clubnamehandleChange} value={clubname} disabled={cnflag} placeholder="Please input clubname" />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type="submit" variant="primary" onClick={handleSave}>
                                Save Changes
                            </Button>
                        </Modal.Footer>

                    </Form>
                </Modal>
            </>
        );
    }


    return (
        <Container style={{ padding: 30, display: 'block', maxWidth: '100%' }}>
            <AlertDialog />
            <TableContainer
                columns={columns}
                data={data}
                renderRowSubComponent={renderRowSubComponent}
            />
        </Container>
    );
};

export default Alert;
