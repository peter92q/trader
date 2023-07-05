import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const styles = {
  pinkGradient: `absolute z-[0] w-[40%] h-[40%] right-[25%] bottom-0 sm:bottom-[20%] lg:opacity-50 rounded-full pink__gradient`,
  purpleGradient: `absolute z-[0] w-[40%] h-[40%] right-[25%] bottom-0 sm:bottom-[20%] lg:opacity-50 rounded-full purple__gradient`,
  blueGradient: `absolute z-[0] w-[40%] h-[40%] right-[25%] bottom-0 sm:bottom-[20%] lg:opacity-50 rounded-full blue__gradient`,
};

const cryptocurrencies = [
  'bitcoin',
  'ethereum',
  'binancecoin',
  'ripple',
  'cardano',
];

export default function Gradients() {
  const { id } = useParams();
  const location = useLocation();
  const desiredRoute = "/portfolio";

  return (
    <>
      {cryptocurrencies.includes(id) || location.pathname === desiredRoute ? (
        <>
          <div className={`${styles.pinkGradient}`} />
          <div className={`${styles.purpleGradient}`} />
          <div className={`${styles.blueGradient}`} />
        </>
      ):''}
    </>
  );
}
