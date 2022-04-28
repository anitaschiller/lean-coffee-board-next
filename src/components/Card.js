import {
  Card as MuiCard,
  CardActions,
  CardContent,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useSWRConfig } from 'swr';

export default function Card(props) {
  const [isEditMode, setIsEditMode] = useState(false);

  function enableEditMode() {
    setIsEditMode(true);
  }

  function disableEditMode() {
    setIsEditMode(false);
  }

  return (
    <MuiCard>
      {isEditMode ? (
        <CardEditMode {...props} onDisableEditMode={disableEditMode} />
      ) : (
        <CardShowMode {...props} onEnableEditMode={enableEditMode} />
      )}
    </MuiCard>
  );
}

function CardShowMode({ name, content, id, onEnableEditMode }) {
  const { mutate } = useSWRConfig();
  return (
    <>
      <CardContent>
        <Typography variant="h5">{content}</Typography>
        <Typography>{name}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={async () => {
            const response = await fetch('/api/card/' + id, {
              method: 'DELETE',
            });
            console.log(await response.json());
            mutate('/api/cards');
          }}
        >
          Delete
        </Button>
        <Button size="small" onClick={onEnableEditMode}>
          Edit
        </Button>
      </CardActions>
    </>
  );
}

function CardEditMode({ name, content, id, onDisableEditMode }) {
  const [nameValue, setNameValue] = useState(name);
  const [contentValue, setContentValue] = useState(content);
  const { mutate } = useSWRConfig();

  async function submit(event) {
    event.preventDefault();

    const response = await fetch('/api/card/' + id, {
      method: 'PUT',
      // body object zu JSON String machen
      body: JSON.stringify({
        content: contentValue,
        name: nameValue,
      }),
    });
    console.log(await response.json());
    mutate('/api/cards');

    onDisableEditMode();
  }

  return (
    <form onSubmit={submit}>
      <CardContent>
        <TextField
          name="content"
          label="content"
          fullWidth
          multiline
          row={2}
          value={contentValue}
          onChange={(event) => setContentValue(event.target.value)}
        />
        <TextField
          name="name"
          label="name"
          fullWidth
          value={nameValue}
          onChange={(event) => setNameValue(event.target.value)}
        />
      </CardContent>
      <CardActions>
        <Button size="small" type="submit">
          Save
        </Button>
      </CardActions>
    </form>
  );
}
