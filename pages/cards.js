import { Typography } from '@mui/material';
import { getCards } from '../src/services/get-cards';
import CardGrid from '../src/components/CardGrid';

export function getStaticProps() {
  const cards = getCards();
  return {
    props: {
      cards,
    },
  };
}

export default function Cards({ cards }) {
  console.log(cards);
  return (
    <CardGrid cards={cards}>
      <Typography variant="h1">Cards</Typography>
    </CardGrid>
  );
}
