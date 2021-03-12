import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface NavIconProps {
  to: string;
  title: string;
  icon: React.JSXElementConstructor<Record<string, unknown>>;
  isActive: boolean;
}

function NavIcon({
  to, title, icon: Icon, isActive,
}: NavIconProps) {
  const iconClassNames = classNames('hover:fill-secondary hover:stroke-secondary', {
    'fill-secondary': isActive,
    'stroke-secondary': isActive,
  });

  return (
    <Link to={to}>
      <Icon className={iconClassNames} data-tip={title} data-for="nav-tooltip" />
    </Link>
  );
}

export default NavIcon;
