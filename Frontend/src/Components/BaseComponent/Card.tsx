import React, { useContext } from 'react'
import Button from './Button'
import CoinFace from '../../assets/img/Coin_Face.svg'
import MoreIcon from '../../assets/img/MoreIcon.svg'
import { ThemeContext } from '../../context/ThemeContext';
import Details from './Map/DetailMap';

export interface TxnNDBest {
        name?: string;
        lastMonth?: number;
        down?: number;
        amount?: string | "";
}

interface coord {
    lat: number,
    lng: number
}

interface CardProp {
    type: "TotalAmount" | "Balance" | "TransactionNdBest" | "Activity";
    className?: string;
    txnNbest?: TxnNDBest;
    coord?: coord
}

const ActivityComponent = () => {
    const theme = useContext(ThemeContext)
    return (
        <div className={`WaveParentDiv-experimental overflow-hidden w-full ${theme.theme == "dark" ? "bg-[#121212]" : "bg-white"}`} >
            <div className='ocean'>
                <div className='wave'></div>
                <div className='wave'></div>
            </div>
            <div className='w-full p-4'>
                <div className='flex justify-between'>
                <div>Activity:</div>
                <div className='bg-base-300 px-5 rounded-md '>All</div>
                </div>
                <div className='text-subtitle font-extrabold py-2'>
                    {Math.round(Math.random() * 1000)} Visits
                </div>
            </div>
        </div>
    )
}

const TransactionNdBestComponent = ({down, lastMonth, name, amount}:TxnNDBest) => {
    const theme = useContext(ThemeContext)
    return (
        <div className={` overflow-hidden w-full p-3.5 h-full ${theme.theme == "dark" ? "bg-[#121212]" : "bg-white"}`} >
            <div className="w-full flex flex-col justify-between h-full py-2">
                    <div className='flex justify-between items-center mr-2 ml-1'>
                        <a title={name} className='cursor-pointer hover:MainthemeTextColor'>{`${name}`.slice(0, 7) +"..."+ `${name}`.slice(name?.length ? name.length - 7:  0, name?.length)}:</a>
                        <div className=''>
                            <img
                                src={MoreIcon}
                                alt="More Icon"
                                className="h-7 rounded-full mr-4"
                            />
                        </div>
                    </div>
                    <div className='w-full '>
                        <div className='text-h2 font-extrabold '>
                            {/* {`${amount}`.length > 3 ? `${amount}`.slice(0, `${amount}`.length - 3) + "k" : amount} */}
                            {`${amount}`.length > 3 ? (parseFloat(`${amount}`) / 1000).toFixed(2) + "k" : amount}
                        </div>
                    </div>
                    <div className='w-full justify-between flex text-[10px]'>
                        <div className='flex'>Last Month: <div className='ml-2 MainthemeTextColor'>+{lastMonth}</div></div>
                        <div className='flex'>Down: <div className='ml-2 MainthemeTextColor'>+{down}</div></div>
                    </div>
            </div>
        </div>
    )
}

const SmallDetailedMap = ({lat, lng}:coord) => {
    const theme = useContext(ThemeContext)
    return (
        <div className={`bg-gradient-to-t ${theme.theme == "dark" ? "from-stone-900 " : "from-white"}  flex items-end h-full justify-center w-full relative`}>
                <Details coord={{lat, lng}} />
                <div className='absolute w-full h-full flex items-end p-2'>
                <div className="w-full ">
                    
                    <Button className="w-full border-none" type='warning' onClick={()=> window.location.replace(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`)}>More</Button>
                    {/* <button className=" btn-primary py-2 rounded-md w-full MainthemeBackGroundColor">History</button> */}
                </div>
                </div>
        </div>
    )
}

const BalanceCompoennt = () => {
    const theme = useContext(ThemeContext)
    return (
        <div className={`${theme.theme == "dark"? "bg-[#121212]" : "bg-[#C7C7D1]"} h-full justify-center w-full p-3 `}>
                <div className="w-full flex flex-col justify-between ">
                    <div className='flex justify-between items-center mr-2 ml-1'>
                        <div>Balance:</div>
                        <div className=''>
                        <img
                                src={MoreIcon}
                                alt="More Icon"
                                className="h-7 rounded-full mr-4"
                            />
                        </div>
                    </div>
                    <div className='mt-6'>
                        <div className={`flex justify-center items-center py-4 rounded-2xl my-4 border ${theme.theme == "dark" ? "bg-[#292929] border-[#404040]" : "bg-[#C7C7D1] border-[#a3a3aa]"}`}>
                            <img
                                src={CoinFace}
                                alt="Coinface"
                                className="h-7 rounded-full mr-4"
                            />
                            <div className='text-base-big font-extrabold'>0.000012</div>
                            <div className='ml-4 text-base-bold w-7 h-7 rounded-full bg-gray-500 flex justify-center items-center'>+</div>
                        </div>
                        <div className='flex'>
                            <Button className="flex-1 mr-1" type='light' >Deposit</Button>
                            <Button className="flex-1 ml-1" type='dark' >Withdraw</Button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

function Card({type, className, txnNbest, coord}:CardProp) {
    const theme = useContext(ThemeContext)
  return (
    <div className={` w-full ${type == "TotalAmount" ? "h-[22rem]" : "h-56"} rounded-2xl relative overflow-hidden border ${theme.theme == "dark" ? "border-gray-900" : "border-gray-300"} ${className}`} style={{background: `url("/TotalProfite.png")`, backgroundSize: "90% 55%", backgroundPosition: "center top", backgroundRepeat: "no-repeat"}}>
            {
                type == "TotalAmount" && (<SmallDetailedMap lat={coord ? coord.lat : 0} lng={coord ? coord.lng : 0} />) 
            }

            {
                type == "Balance" && (<BalanceCompoennt />)
            }

            {
                type == "Activity" && (<ActivityComponent />)
            }

            {
                type == "TransactionNdBest" && (<TransactionNdBestComponent down={txnNbest?.down} lastMonth={txnNbest?.lastMonth} name={txnNbest?.name} amount={txnNbest?.amount} />)
            }
    </div>
  )
}

export default Card