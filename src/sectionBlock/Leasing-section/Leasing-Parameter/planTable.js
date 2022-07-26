import React, {useState,useEffect} from 'react';
import './lp.css';
import { VscChevronLeft, VscChevronRight, VscChevronDown } from "react-icons/vsc";
import PlanItem from './planItem';

export const PlanTable = ({data, language}) => { 
    const [currentPage, setCurrentPage] = useState(1);
    const [tableItems, setTableItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentItems, setCurrentItems] = useState([]);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [ipp, setIpp] = useState(false);
    useEffect(()=>{
        const fetchData = async () => {
          setLoading(true);
          const res = data ;
          setTableItems(res);
          setLoading(false);
        }
        fetchData();
      }, [data]);
    useEffect(()=>{
        if(tableItems !== undefined){
            setCurrentItems(tableItems.slice(indexOfFirstItem,indexOfLastItem));
        }
    },[tableItems, indexOfFirstItem, indexOfLastItem]);
    const lastPage = Math.floor(Object.values(tableItems).length/itemsPerPage) + 1;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPaginate = (pageNumber) => {
        if(pageNumber===lastPage){
            setCurrentPage(pageNumber);
        }else{
            setCurrentPage(pageNumber+1);
        }
    }
    const backPaginate = (pageNumber) => {
        if(pageNumber===1){
            setCurrentPage(pageNumber);
        }else{
            setCurrentPage(pageNumber-1);
        }
    }
  const pageNumbers = [];
  if(tableItems!==undefined){
       for (let i = 1; i <= Math.ceil(tableItems.length / itemsPerPage); i++ ){
            pageNumbers.push(i);
        }
    }
  const sliderRestrictionBack = () => {
      if(currentPage === 1){
        return 'disable';
      }
  }
  const sliderRestrictionNext = () => {
      if(currentPage === lastPage){
        return 'disable';
      }
  };
  const activePaginate = (pageNumber) => {
      if(currentPage === pageNumber){
          return "active";
      }
  }
  useEffect(()=>{
    document.body.addEventListener('click',(event)=>{
        if(event.path[0].tagName !== 'svg'){
            setIpp(false);
        }
    })
  })
  if(loading){
      return <h1>Loading...</h1>
  }

  return (
    <div className="planTable">         
        <div className="table-responsive">
            <div className="table-lists">
                <ul className="listHeader">
                    <li className='listHeaderItem listItem'>Payment date</li>
                    <li className='listHeaderItem listItem'>Payment No. </li>
                    <li className='listHeaderItem listItem'>Interests</li>
                    <li className='listHeaderItem listItem'>Capital value</li>
                    <li className='listHeaderItem listItem'>Quota value</li>
                    <li className='listHeaderItem listItem'>Balance</li>
                </ul>
                {
                    currentItems.map((info, i) => {
                        return(
                            <PlanItem key={i} info={info} />
                        )
                    })
                }
            </div>
        </div>
        <div className="pagination">
            <ul className="itemsPerPage">
                <p>Rows for page:</p>
                <ul><p>{itemsPerPage}</p>
                    <ul className={ipp?`open`:`close`}>
                        <li><p onClick={()=>setItemsPerPage(5)}>5</p></li>
                        <li><p onClick={()=>setItemsPerPage(10)}>10</p></li>
                        <li><p onClick={()=>setItemsPerPage(15)}>15</p></li>
                    </ul>
                </ul>
                <span onClick={()=>{setIpp(!ipp);}} style={{cursor:'pointer'}}><VscChevronDown /></span>
            </ul>
            <ul>
                <li onClick={()=>backPaginate(currentPage)} className={`paginate-item back ${sliderRestrictionBack()}`}><VscChevronLeft /> </li>
                {
                    pageNumbers.map((number,i)=>{
                        return(
                            <li onClick={()=> paginate(number)} key={i} className={`paginate-item paginate-number ${activePaginate(number)}`}>{number}</li>
                        )
                    })
                }
                <li onClick={()=>nextPaginate(currentPage)} className={`paginate-item next ${sliderRestrictionNext()}`}><VscChevronRight /> </li>
            </ul>
        </div>
    </div>
  )
}