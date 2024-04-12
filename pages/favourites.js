import { useAtom } from 'jotai';
import { Card, Col, Row } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import { favouritesAtom } from '@/store';

// favourites list not displaying.
// however, when i console log favouriteslist, it shows a list of favorites, but doesnt display
// on the page.
export default function Favourites() {

  const [favouritesList] = useAtom(favouritesAtom);
  console.log(favouritesList);
// add the following line of code below the line to "useAtom()" within the component
// function (ie: after our hooks):

if(!favouritesList){ return null};

  return (
    <>
      {favouritesList.length > 0 ?

        <Row className="gy-4">{favouritesList.map(objID => (
          <Col lg={3} key={objID}><ArtworkCard objectID={objID} /></Col>
        ))}</Row>

        :

        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>Try adding some new artwork to the list.
          </Card.Body>
        </Card>
      }
    </>
  )
}