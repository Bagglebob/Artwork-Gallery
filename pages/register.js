import { Card, Form, Button } from "react-bootstrap";
import { useState } from 'react';
import { authenticateUser } from '@/lib/authenticate';
import { registerUser } from "@/lib/authenticate";
import { useRouter } from 'next/router';
import { atom, useAtom } from 'jotai';


export default function Register(props) {  
  // (async) function called "updateAtoms" within the "Login" component 
  // updates favourites and history atoms with return values from "getFavourites" and "getHistory"
 
  const router = useRouter();

  const [warning, setWarning] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registerUser(user, password, password2);    
      router.push('/login');
    } catch (err) {
      setWarning(err.message);
      console.log(warning);
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body><h2>Register</h2>Register for an account below:</Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control type="text" id="userName" name="userName" onChange={e => setUser(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" id="password" name="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control type="password" id="password2" name="password2" onChange={e => setPassword2(e.target.value)} />
        </Form.Group>
        <br />
        <Button variant="primary" className="pull-right" type="submit">Register</Button>
      </Form>
    </>
  );
}