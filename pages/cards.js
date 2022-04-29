import { Typography } from '@mui/material';
import { getCards } from '../src/services/get-cards';
import CardGrid from '../src/components/CardGrid';
import { SWRConfig } from 'swr';
import { swrFetcher } from '../src/lib/swr-fetcher';
import User from '../src/models/User';

export async function getStaticProps() {
  const cards = await getCards();
  return {
    props: {
      fallback: {
        // folgende Daten (aus lokaler JSON Datei) sollen als Fallback genutzt werden, wenn über Server folgende Route anfragt wird
        // (wenn über Browser Anfrage stattfindet, dann sollen Daten von der API geladen werden)
        '/api/cards': cards,
      },
    },
  };
}

export default function Cards({ fallback }) {
  return (
    <SWRConfig value={{ fetcher: swrFetcher, fallback }}>
      <Typography variant="h1">Cards</Typography>
      <CardGrid />
    </SWRConfig>
  );
}
