import { Link } from 'react-router-dom';

const styles = {
  mainContainer: `relative lg:flex-[0.5] flex-[2] flex items-center justify-center min-w-[170px] h-[500px] duration-500`,
  img: `absolute w-full h-full object-cover rounded-[3px] border-[2px] border-pink-900/20`,
  bannerContainer: `absolute bottom-0 p-8 flex justify-start h-[60px] lg:h-[160px] w-full 
  flex-row bg-[rgba(0,0,0,0.8)] rounded-b-[4px] cursor-pointer`,
  links: `flex flex-row lg:flex-col justify-center items-center lg:items-start gap-2`,
  tinyImgContainer: `flex justify-center items-center w-[60px]`,
  tinyImg: `h-1/2 w-1/2 lg:h-[40px] lg:w-[40px] lg:translate-x-[-13px] object-contain mt-[10px] lg:mt-[5px]`,
  bannerTitle: `first-letter:uppercase tracking-wider mt-[10px] font-semibold lg:text-[25px] xl:text-[32px] text-[24px] text-white`,
  bannerSmallText: `font-normal text-[14px] text-white uppercase`
}

export default function ExploreCard  ( {imgUrl,title,icon,index}:{imgUrl: string,title:string,icon:string,index:number} ) {
  return(
  <div
    className={`${styles.mainContainer}`}
  > 
    <img
      src={imgUrl}
      alt={`planet ${index}`}
      className={`${styles.img}`}
    />
    <div className={`${styles.bannerContainer}`}>
      <Link to={`/crypto/${title}`} className={`${styles.links}`}> 
        <div className={`${styles.tinyImgContainer}`}>
          <img src={icon} alt={icon} className={`${styles.tinyImg}`} />
        </div>
        <h2 className={`${styles.bannerTitle}`}>
          {title==="binancecoin" ? "BNB":title}
        </h2>
        <p className={`${styles.bannerSmallText}`}>Trade</p>
      </Link>
    </div>
  </div>
)};
