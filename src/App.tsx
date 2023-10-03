import './App.css';
import Button from './components/Button/Button';
import { useColor } from './hooks/useColor';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function App() {
  const theme = useColor({});
  return (
    <div className="App">
      <Button
        backgroundColor={theme.Primary}
        className="rounded-full"
        textColor={theme.White}
        title="Submit"
        onPress={() => console.log('Button Pressed')}
        leftIcon={faArrowRight}
      />
    </div>
  );
}

export default App;
