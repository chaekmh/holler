import { render, screen } from '@testing-library/react';
import { CharacterCard } from '../CharacterCard';

const cardData = {
  char_id: 1,
  name: 'Walter White',
  birthday: '09-07-1958',
  occupation: ['High School Chemistry Teacher', 'Meth King Pin'],
  img: 'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg',
  status: 'Presumed dead',
  nickname: 'Heisenberg',
  appearance: [1, 2, 3, 4, 5],
  portrayed: 'Bryan Cranston',
  category: 'Breaking Bad',
  better_call_saul_appearance: [],
};

const Card = (props) => {
  return <CharacterCard {...props} />;
};

it('should render img element', () => {
  render(<Card {...cardData}></Card>);
  const imgElement = screen.getByRole('img');
  expect(imgElement).toBeInTheDocument();
});

it('should render description elements', () => {
  render(<Card {...cardData}></Card>);
  const descriptionElements = screen.getAllByText('');
  expect(descriptionElements.length).toBe(5);
  descriptionElements.forEach((ele) => expect(ele).toBeInTheDocument());
});
