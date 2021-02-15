import 'react-app-polyfill/ie11';
import * as React from '../.';
import * as ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      <div>Daniel</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
