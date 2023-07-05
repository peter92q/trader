import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { signOut } from '../../Configs/Redux/accountSlice';
import { useAppDispatch, useAppSelector } from '../../Configs/Redux/store';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { ClickAwayListener } from '@mui/material';

const styles = {
  mainContainer: `z-[999] bg-gray-900 font-extralight py-1 px-6 right-3 
  absolute mt-[50px] text-white text-[25px] cursor-pointergap-2 flex 
  flex-col items-center rounded-md`,
  textWrapper: `w-full flex flex-col justify-center items-center`,
  username: `text-[40px] font-medium border-b-gray-400 border-b-[1px]`,
  balance: `text-[20px] mb-[5px] text-pink-500`,
  stocksWrapper: `flex flex-row justify-center items-center gap-1 mb-[2px]`,
  portfolioWrapper: `flex flex-row justify-center items-center gap-1 mb-[2px]`,
  logoutWrapper: `flex flex-row items-center gap-1 mb-1 mb-[4px] cursor-pointer`,
};

export default function NavbarMenu( {scrollToParent}: {scrollToParent: () => void} ) {
  const { user } = useAppSelector((state) => state.account);
  const [menu, setMenu] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  function handleCloseMenu(){
    setMenu(false);
  }

  const scrollToStocks = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scrollToParent();
        setMenu((prev) => !prev);
      }, 500);
    } else {
      scrollToParent();
      setMenu((prev) => !prev);
    }
  };

  return (
    <>
      {user ? (
        <ClickAwayListener onClickAway={handleCloseMenu}>
        <div className="flex">
          <IconButton onClick={() => setMenu((prev) => !prev)}>
            <AccountCircleIcon sx={{ color: '#ac1161', scale: '1.6' }} />
          </IconButton>
          {menu && (
            <motion.div
              initial={{ opacity: 0, y: -20, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.5 }}
              className={`${styles.mainContainer}`}
            >
              <div className={`${styles.textWrapper}`}>
                <p className={`${styles.username}`}>{user.UserName}</p>

              </div>
              <span className={`${styles.stocksWrapper}`}>
                <ShowChartIcon className="text-pink-500 translate-x-[-10px] scale-125" />
                <p
                  onClick={scrollToStocks}
                  className="mr-[15px] cursor-pointer hover:opacity-80"
                >
                  Trade
                </p>
              </span>
              <span
                onClick={() => setMenu((prev) => !prev)}
                className={`${styles.portfolioWrapper}`}
              >
                <PieChartIcon className="text-pink-500 translate-x-[2px] scale-125" />
                <Link to="/portfolio" className="ml-4 hover:opacity-80">
                  Portfolio
                </Link>
              </span>
              <span className={`${styles.logoutWrapper}`}>
                <ExitToAppIcon className="mr-[5px] text-pink-500 translate-x-[-9px] scale-125" />
                <p
                  onClick={() => {
                    dispatch(signOut());
                    setMenu((prev) => !prev);
                  }}
                  className="mr-[5px] hover:opacity-80"
                >
                  Logout
                </p>
              </span>
            </motion.div>
          )}
        </div>
        </ClickAwayListener>
      ) : (
        <Link to="login" className="text-[30px] text-pink-700 font-medium">
          <VpnKeyIcon className="text-pink-700" sx={{ fontSize: 40 }} />
        </Link>
      )}
    </>
  );
}
