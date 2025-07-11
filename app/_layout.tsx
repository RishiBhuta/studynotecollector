import { Slot } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from './redux/Store';

export default function Layout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
