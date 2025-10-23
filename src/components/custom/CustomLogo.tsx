import { Link } from 'react-router';

interface Props {
  subtitle?: string;
}

export const CustomLogo = ({ subtitle = 'Shop' }: Props) => {
  return (
    <Link
      to="/"
      className="flex items-center whitespace-nowrap font-din-next text-xl"
    >
      <span className="m-0 whitespace-nowrap">DUNNO |</span>

      <span className="m-0 px-2 text-muted-foreground whitespace-nowrap">
        {subtitle}
      </span>
    </Link>
  );
};
