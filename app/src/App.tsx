import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Navbar from './common/navbar';

import DashboardContainer from './dashboard/dashboard.container';
import ExpensesContainer from './expenses/expenses.container';
import IncomeContainer from './income/income.container';

function App() {
  return (
    <Router>
      <div className="flex items-stretch h-screen w-screen">
        <Navbar />
        <main className="flex-grow">
          <Switch>
            <Route exact path={['/dashboard', '/']} component={DashboardContainer} />
            <Route exact path="/expenses" component={ExpensesContainer} />
            <Route exact path="/income" component={IncomeContainer} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
