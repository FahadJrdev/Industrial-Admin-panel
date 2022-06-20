import React, {useState,useEffect} from 'react';
import './table.css';
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { InvestorDatosItem, InvestorItem , FundItem, ProjectItem } from './InvestorTable';

export const FundTable = ({header1,header2,header3,header4,header5,data,currentPage,setCurrentPage}) => { 
    const [tableItems, setTableItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [itemsPerPage] = useState(5);
    const [currentItems, setCurrentItems] = useState([]);
    useEffect(()=>{
      const fetchData = async () => {
        setLoading(true);
        const res = data ;
        setTableItems(res);
        setLoading(false);
      }
      fetchData();
    }, [data]);
    
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
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
  if(loading){
      return <h1>Loading...</h1>
  }

  return (
    <div className="table">         
        <div className="table-responsive">
            <div className="table-lists fundTable">
                <ul className="listHeader">
                    <li className='listHeaderItem'>{header1}</li>
                    <li className='listHeaderItem'>{header2}</li>
                    <li className='listHeaderItem'>{header3}</li>
                    <li className='listHeaderItem'>{header4}</li>
                    <li className='listHeaderItem'>{header5}</li>
                </ul>
                {
                    currentItems.map((info,i)=>{
                        if(info.DATOS.length>0){
                            return(
                                <InvestorDatosItem key={i} info={info} />
                            )
                        }else{
                            return(
                                <InvestorItem key={i} info={info} />
                            )
                        }
                        
                    })
                }
            </div>
        </div>
        <div className="pagination">
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
export const InvestorTable = ({header1,header2,header3,header4,data}) => {
    const [tableItems, setTableItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
        const fetchData = async () => {
        setLoading(true);
        const res = data ;
        setTableItems(res);
        setLoading(false);
        }
        fetchData();
    }, [data]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tableItems.slice(indexOfFirstItem,indexOfLastItem);
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
  for (let i = 1; i <= Math.ceil(tableItems.length / itemsPerPage); i++ ){
      pageNumbers.push(i);
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
  if(loading){
      return <h1>Loading...</h1>
  }
  return (
    <div className="table">   
        <div className="table-responsive">
            <div className="table-lists projectTable">
                <ul className="listHeader">
                    <li className='listHeaderItem'>{header1}</li>
                    <li className='listHeaderItem'>{header2}</li>
                    <li className='listHeaderItem'>{header3}</li>
                    <li className='listHeaderItem'>{header4}</li>
                </ul>
                {
                    currentItems.map((info,i)=>{
                        return(
                            <ul key={info.id} className="listBody">
                                <li className='listItem'>{info.DESCRIPCION}</li>
                                <li className='listItem'>0</li>
                                <li className='listItem'>0</li>
                                <li className='listItem'>{info.D_VALOR}</li>
                            </ul>
                        )
                    })
                }
            </div>
        </div>      
        <div className="pagination">
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
export const FundManagementTable = ({header1,header2,header3,header4,data,language}) => {
    const [tableItems, setTableItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
        const fetchData = async () => {
        setLoading(true);
        const res = data ;
        setTableItems(res);
        setLoading(false);
        }
        fetchData();
    }, [data]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tableItems.slice(indexOfFirstItem,indexOfLastItem);
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
  for (let i = 1; i <= Math.ceil(tableItems.length / itemsPerPage); i++ ){
      pageNumbers.push(i);
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
  if(loading){
      return <h1>{language.global.load}...</h1>
  }
  return (
    <div className="table">  
        <div className="table-responsive">
            <div className="table-lists projectTable">
                <ul className="listHeader">
                    <li className='listHeaderItem'>{header1}</li>
                    <li className='listHeaderItem'>{header2}</li>
                    <li className='listHeaderItem'>{header3}</li>
                    <li className={`listHeaderItem`}>{header4}</li>
                </ul>
                {
                    currentItems.map((info,i)=>{
                        return(
                            <FundItem key={i} info={info} />    
                        )
                    })
                }
            </div>
        </div>       
        <div className="pagination">
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
export const ProjectManagementTable = ({header1,header2,header3,header4,header5,header6,data,language}) => {
    const [tableItems, setTableItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
        const fetchData = async () => {
        setLoading(true);
        const res = data ;
        setTableItems(res);
        setLoading(false);
        }
        fetchData();
    }, [data]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tableItems.slice(indexOfFirstItem,indexOfLastItem);
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
  for (let i = 1; i <= Math.ceil(tableItems.length / itemsPerPage); i++ ){
      pageNumbers.push(i);
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
  if(loading){
      return <h1>{language.global.load}...</h1>
  }
  return (
    <div className="table">       
        <div className="table-responsive">
            <div className="table-lists projectTable">
                <ul className="listHeader">
                    <li className='listHeaderItem'>{header1}</li>
                    <li className='listHeaderItem'>{header2}</li>
                    <li className='listHeaderItem'>{header3}</li>
                    <li className='listHeaderItem'>{header4}</li>
                    <li className='listHeaderItem'>{header5}</li>
                    <li className='listHeaderItem'>{header6}</li>
                </ul>
                {
                    currentItems.map((info,i)=>{
                        return(
                            <ProjectItem key={i} info={info} />    
                        )
                    })
                }
            </div>
        </div>  
        <div className="pagination">
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