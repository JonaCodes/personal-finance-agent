import { observer } from 'mobx-react-lite';
import appStore from '../stores/appStore';

const Home = observer(() => {
  return (
    <div>
      <h1>Home</h1>
      <p>{appStore.demoMessage}</p>
    </div>
  );
});

export default Home;
