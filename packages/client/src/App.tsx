import React, { ReactElement } from 'react';
import { Button, Input } from '@namespace/components';

const App = (): ReactElement => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      // eslint-disable-next-line no-shadow
      .then(data => setData(data.message));
  }, []);

  return (
    <div className="App">
      <h2>Title</h2>
      <p>{!data ? 'Loading...' : data}</p>
      <Button />
      <Input />
    </div>
  );
};

export default App;
