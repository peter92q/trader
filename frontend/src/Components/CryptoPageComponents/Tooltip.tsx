import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';

export function TooltipMarketCap () {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
    <div>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title="The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.
        Market cap = Current price x Circulating supply"
      >
         <IconButton>
           <InfoIcon 
             onClick={handleTooltipOpen} 
             sx={{fill:'white', height: 20}} 
             className='translate-x-[-5px]'
             />
         </IconButton>
     
      </Tooltip>
    </div>
  </ClickAwayListener>
  );
};

export function TooltipVolume () {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
    return (
       <ClickAwayListener onClickAway={handleTooltipClose}>
       <div>
         <Tooltip
           PopperProps={{
             disablePortal: true,
           }}
           onClose={handleTooltipClose}
           open={open}
           disableFocusListener
           disableHoverListener
           disableTouchListener
           title="A measure of how much of a cryptocurrency was traded in the last 24 hours."
         >
            <IconButton>
              <InfoIcon 
                onClick={handleTooltipOpen} 
                sx={{fill:'white', height: 20}} 
                className='translate-x-[-5px]'
                />
            </IconButton>
        
         </Tooltip>
       </div>
     </ClickAwayListener>
    );
  };
  