import './App.css';
import { Outlet } from 'react-router-dom';
import { Container } from './shared/ui/Container.tsx';
import { Provider } from './core/providers/Provider.tsx';

function App() {
  return (
    <div>
      <main>
        <Provider>
          <Container>
            <Outlet />
          </Container>
        </Provider>
      </main>
    </div>
  );
}

export default App;
