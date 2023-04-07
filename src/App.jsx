import React, { useState, useEffect }from 'react';
import {Container, Image, Col, Row, Form} from 'react-bootstrap';
import { Pet1, Pet2, Pet3, Pet4, Pet5 } from './assets';
import './app.css';

const App = () => {
    const pets = [
        { name: 'pet1', img: Pet1 },
        { name: 'pet2', img: Pet2 },
        { name: 'pet3', img: Pet3 },
        { name: 'pet4', img: Pet4 },
        { name: 'pet5', img: Pet5 },
    ];

    const [items, setItems] = useState([]);
    const [petName, setPetName] = useState('');
    const [currentPetIndex, setCurrentPetIndex] = useState(0);
    const currentPet = pets[currentPetIndex];

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('items'));
        if (items) {
            setItems(items);
            setPetName(items[currentPet.name]);
        }
    }, []);

    useEffect(() => {
        if (items.length !== 0) {
            localStorage.setItem('items', JSON.stringify(items));
        }
    }, [items]);

    const handleSubmit = (event, pet_key) => {
        event.preventDefault();
        let name = event.target.name.value;
        if (name != '') {
            setPetName(name);
            setItems({...items, [pet_key]: name});
            event.target.name.value = "";
        }
    }

    const handleChangePet = () => {
        const nextIndex = currentPetIndex === pets.length - 1 ? 0 : currentPetIndex + 1;
        setCurrentPetIndex(nextIndex);
        setPetName(items[pets[nextIndex].name]);
    };

    return (
        <div>
            <Container className='pt-3 text-center' style={{maxWidth:800}}>
                <h1 className="text-center text-light mb-3">My Pet</h1>
                <Form className="mb-2" onSubmit={(event) => {handleSubmit(event, currentPet.name)}}>
                    <Form.Group as={Row}>
                        <Col sm="6 mb-2">
                            <Form.Control placeholder="Type your Pet's name here" name="name"></Form.Control>
                        </Col>
                        <Col sm="6">
                            <Form.Control type="submit" className="btn btn-dark" value="Set Pet Name"></Form.Control>
                        </Col>
                    </Form.Group>
                </Form>
                <Image src={currentPet.img} fluid className="rounded" onClick={handleChangePet}></Image>
                <h1 className="text-light my-2">Hello I'm {petName}</h1>
                <p className="text-light">(Click anywhere in the image to change pet)</p>
            </Container>
        </div>
    )
}

export default App