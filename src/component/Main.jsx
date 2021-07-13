import { useState, useEffect } from 'react';
import { CharacterCard } from './CharacterCard';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Main(props) {
  // Character data from api
  const [characters, setCharacters] = useState([]);
  // Deathcount data from api
  const [charDeathCount, setCharDeathCount] = useState([]);
  // CharacterCard Component data
  const [characterCards, setCharacterCards] = useState([]);
  // Sorted character indices data
  const [sortedIndex, setsortedIndex] = useState([]);
  // Final CharacterCard component to be displayed on the web
  const [displayCards, setDisplayCards] = useState([]);
  // Sort type state
  const [sorted, setSorted] = useState('Featured');

  /**
   * Sorting method based on sort type
   *
   * @param {*} value (String) Sorting type: 'Featured', 'First Name', 'Last Name', 'Death Count'
   */
  function sortBy(value) {
    const result = [...sortedIndex];
    switch (value) {
      case 'Featured':
        result.sort((x, y) => {
          return characters[x].char_id - characters[y].char_id;
        });
        break;
      case 'First Name':
        result.sort((x, y) => {
          if (
            characters[x].name.toLowerCase() < characters[y].name.toLowerCase()
          )
            return -1;
          if (
            characters[x].name.toLowerCase() > characters[y].name.toLowerCase()
          )
            return 1;
          return 0;
        });
        break;
      case 'Last Name':
        result.sort((x, y) => {
          const nameX = characters[x].name.split(' ').pop();
          const nameY = characters[y].name.split(' ').pop();
          if (nameX.toLowerCase() < nameY.toLowerCase()) return -1;
          if (nameX.toLowerCase() > nameY.toLowerCase()) return 1;
          return 0;
        });
        break;
      case 'Death Count':
        result.sort((x, y) => {
          return charDeathCount[y] - charDeathCount[x];
        });
        break;
      default:
    }
    setSorted(value);
    setsortedIndex(result);
    createDisplayCards(result, characterCards);
  }

  /**
   * Helper method to re-order CharacterCard component based on the sort
   *
   * @param {*} arr (Array) Sorted indices array
   * @param {*} cards (Array) CharacterCard component array
   */
  function createDisplayCards(arr, cards) {
    setDisplayCards(arr.map((ele) => cards[ele]));
  }

  useEffect(() => {
    fetch('https://www.breakingbadapi.com/api/characters')
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);

        let cards = data.map((ele, i) => {
          return <CharacterCard {...ele} key={i} />;
        });
        setCharacterCards(cards);

        const defaultSort = cards.map((_, i) => i);
        setsortedIndex(defaultSort);
        createDisplayCards(defaultSort, cards);

        let promise = [];
        data.forEach((ele) => {
          const name = ele.name.split(' ').join('+');
          promise.push(
            fetch(`https://www.breakingbadapi.com/api/death-count?name=${name}`)
              .then((res) => res.json())
              .then((data) => data[0])
          );
        });
        Promise.all(promise).then((data) => {
          const temp = [];
          data.forEach((ele, i) => {
            temp[i] = ele.deathCount;
          });
          setCharDeathCount(temp);
        });
      });
  }, []);

  return (
    <div className='main-container'>
      <h1>Breaking Bad Characters</h1>
      <DropdownButton id='dropdown-basic-button' title={'Sort By: ' + sorted}>
        <Dropdown.Item href='#/action-1' onClick={() => sortBy('Featured')}>
          Featured
        </Dropdown.Item>
        <Dropdown.Item href='#/action-2' onClick={() => sortBy('First Name')}>
          First Name
        </Dropdown.Item>
        <Dropdown.Item href='#/action-3' onClick={() => sortBy('Last Name')}>
          Last Name
        </Dropdown.Item>
        <Dropdown.Item href='#/action-3' onClick={() => sortBy('Death Count')}>
          Death Count
        </Dropdown.Item>
      </DropdownButton>
      <div className='card-container'>{displayCards}</div>
    </div>
  );
}
