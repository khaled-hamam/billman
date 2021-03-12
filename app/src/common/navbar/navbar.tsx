import { useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import './navbar.css';
import NavIcon from './nav-icon';

import { ReactComponent as DashboardIcon } from '../../assets/icons/dashboard.svg';
import { ReactComponent as ExpensesIcon } from '../../assets/icons/expenses.svg';
import { ReactComponent as IncomeIcon } from '../../assets/icons/income.svg';
import { ReactComponent as LogoutIcon } from '../../assets/icons/logout.svg';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="w-24 flex items-center flex-col bg-black text-white py-8">
      <p className="text-4xl font-bold cursor-default select-none">
        B
        <span className="text-secondary">.</span>
      </p>
      <div className="flex flex-col space-y-14 mt-16">
        <NavIcon title="Dashboard" to="/dashboard" icon={DashboardIcon} isActive={['/dashboard', '/'].includes(location.pathname)} />
        <NavIcon title="Expenses" to="/expenses" icon={ExpensesIcon} isActive={location.pathname === '/expenses'} />
        <NavIcon title="Income" to="/income" icon={IncomeIcon} isActive={location.pathname === '/income'} />
      </div>
      <LogoutIcon className="mt-auto cursor-pointer hover:fill-secondary" data-tip="Logout" data-for="nav-tooltip" />
      <ReactTooltip id="nav-tooltip" place="right" effect="solid" />
    </nav>
  );
}

export default Navbar;
