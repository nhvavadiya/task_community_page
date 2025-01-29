import { Box, Container, createTheme, ThemeProvider } from '@mui/material';
import Post from './post/Post';
import store from './store';
import { Provider } from 'react-redux';
import Navbar from './layout/Navbar';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem"
        }
      }
    },
  },
  cssVariables: true
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box className="App">
          <Box sx={{ width: '100%', height: '50px' }}><Navbar /></Box>
          <Box sx={{ background: 'lightgrey', flex: 1 }}>
            <Container fixed >
              <Post />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
