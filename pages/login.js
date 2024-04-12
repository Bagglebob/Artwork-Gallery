import { Card, Form, Button } from "react-bootstrap";
import { useState } from 'react';
import { authenticateUser } from '@/lib/authenticate';
import { useRouter } from 'next/router';
import { atom, useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
// Import both the "getFavourites" and "getHistory"
import { getFavourites, getHistory } from "@/lib/userData";


export default function Login(props) {
  //  Reference both the "favouritesAtom" and the "searchHistoryAtom"
  const [favorites, setFavourites] = useAtom(favouritesAtom);
  const [history, setHistory] = useAtom(searchHistoryAtom);
  // (async) function called "updateAtoms" within the "Login" component 
  // updates favourites and history atoms with return values from "getFavourites" and "getHistory"
  async function updateAtoms() {
    setHistory(await getHistory());
    setFavourites(await getFavourites());
  }

  const router = useRouter();

  const [warning, setWarning] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      await updateAtoms();
      router.push('/favourites');
    } catch (err) {
      setWarning(err.message);
      console.log(warning)
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
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
        <br />
        <Button variant="primary" className="pull-right" type="submit">Login</Button>
      </Form>
    </>
  );
}