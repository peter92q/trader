import ApiIcon from '@mui/icons-material/Api';

function Footer() {
  return (
    <footer className="text-gray-300 md:px-[4rem] pb-[1rem]">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center">
        <ApiIcon sx={{fontSize: 30, fill: "#ad196b", marginRight: "5px", marginLeft:"5px"}}/>
        
          <span className="text-lg font-semibold">Trader</span>
        </div>
        <div>
          <nav className="space-x-4 text-[12px] mr-[20px]">
            <a className="text-gray-300 hover:text-white" href="/about">About</a>
            <a className="text-gray-300 hover:text-white" href="/services">Services</a>
            <a className="text-gray-300 hover:text-white" href="/contact">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
