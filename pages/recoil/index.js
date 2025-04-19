import { Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <TextField fullWidth value={text} onChange={onChange} placeholder="Type some text..." />
      <br />
      Echo: {text}
    </div>
  );
}

const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);
    return text.length;
  },
});

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <Typography variant="body1">Character Count: {count}</Typography>;
}

export default function RecoilPage() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h4">Recoil Demo</Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>
              A state management library for React
            </Typography>
            <TextInput />
            <CharacterCount />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6">Sidebar</Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
}
