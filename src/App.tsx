import styles from './App.module.scss';

import { CorePage } from './pages/CorePage/CorePage.tsx';

function App() {

  return (
      <div className={styles.app}>
        <CorePage/>
      </div>
  )
}

export default App
