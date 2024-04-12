import { useAtom } from 'jotai';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router';
import { removeFromHistory } from '@/lib/userData';
import styles from '@/styles/History.module.css';

// history page isnt displaying history even though it is being added and console logged
// on MainNav and search.js (AdvancedSearch)
export default function History() {

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  console.log(searchHistory);
  const router = useRouter();
  //console.log(searchHistory);
  if(!searchHistory){ return null};

  let parsedHistory = [];

  searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(e, index) {
    router.push(`/artwork?${searchHistory[index]}`);
  }

  async function removeHistoryClicked(e, index) {
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  }

  return (<>

    {parsedHistory.length > 0 ?

      <ListGroup >
        {parsedHistory.map((historyItem, index) => (
          <ListGroup.Item key={index} onClick={e => historyClicked(e, index)} className={styles.historyListItem}>
            {
              Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))
            }
            <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      :

      <Card>
        <Card.Body>
          <h4>Nothing Here</h4>Try searching for some artwork.
        </Card.Body>
      </Card>

    }

  </>);
}