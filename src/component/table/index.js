import React, {useState,useEffect} from 'react';
import './table.css';
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { InvestorDatosItem,ItemPermision, InvestorItemc,InvestorItemcs , InvestorItem , FundItem, ProjectItem, RiskItem, BillingItem, BillingDetailItem, BankConfigItem, ContractManagementItem, InvoiceItem, RevenueItem1, RevenueItem2, ConfigurationSettingItem, LastPagoItem, LastPagoItem2, ExpensesItem, GatosItem, UtilidadesItem1, UtilidadesItem2 } from './InvestorTable';
import {Button} from '../buttons';

export const FundTable = ({header1,header2,header3,header4,header5,data,currentPage,setCurrentPage}) => { 
    const [tableItems, setTableItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [itemsPerPage] = useState(5);
    const [currentItems, setCurrentItems] = useState([]);
    const [search, setSearch] = useState('');
    const [allItems, setAllItems] = useState([]);
    useEffect(()=>{
      const fetchData = async () => {
        setLoading(true);
        const res = data ;
        setTableItems(res);
        setLoading(false);
        setSearch('')
        setAllItems(res)
        const searchs = document.querySelector('.header-web .second-part .show .search-container input');
            if(searchs){
                searchs.addEventListener('input',(event)=>{
                    setSearch(event.target.value);
                })
            }
      }
      fetchData();
    }, [data]);
    
    useEffect(()=>{
        if(allItems.length>0){
            if(search){
                setTableItems(allItems.filter((item)=>(item.DATOS.length>0?JSON.parse(item.DATOS[0].INFORMACION_COORPORATIVA).COMPANY_NAME.includes(search):'')))
            }else{
                setTableItems(allItems)
            }
        }
        
       
    }, [search,allItems]);
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
export const FundTable2 = ({header1,header2,header3,header4,header5,data,currentPage,setCurrentPage,opcion}) => { 
    const [tableItems, setTableItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [itemsPerPage] = useState(5);
    const [currentItems, setCurrentItems] = useState([]);
    const [search, setSearch] = useState('');
    const [allItems, setAllItems] = useState([]);
    useEffect(()=>{
      const fetchData = async () => {
        setLoading(true);
        const res = data ;
        setTableItems(res);
        setLoading(false);
        setSearch('')
        setAllItems(res)
        const searchs = document.querySelector('.header-web .second-part .show .search-container input');
            if(searchs){
                searchs.addEventListener('input',(event)=>{
                    setSearch(event.target.value);
                })
            }
      }
      fetchData();
    }, [data]);
    
    useEffect(()=>{
        if(allItems.length>0){
            if(search){
                setTableItems(allItems.filter((item)=>(item.DATOS.length>0?JSON.parse(item.DATOS[0].INFORMACION_COORPORATIVA).COMPANY_NAME.includes(search):'')))
            }else{
                setTableItems(allItems)
            }
        }
        
       
    }, [search,allItems]);
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
                    opcion? currentItems.map((info,i)=>{
                        return(
                        <InvestorItemcs key={i} info={info} />
                        )
                    }):
                    currentItems.map((info,i)=>{
                        return(
                        <InvestorItemc key={i} info={info} />
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
                            <ul key={i} className="listBody">
                                <li className='listItem'>{info.C_NOMBRE_PROYECTO}</li>
                                <li className='listItem'>0</li>
                                <li className='listItem'>0</li>
                                <li className='listItem'>{info.D_USD_INVERTIDOS}</li>
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
    const [search, setSearch] = useState('');
    const [allItems, setAllItems] = useState([]);
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
        setSearch('')
        setAllItems(res)
        const searchs = document.querySelector('.header-web .second-part .show .search-container input');
            if(searchs){
                searchs.addEventListener('input',(event)=>{
                    setSearch(event.target.value);
                })
            }
        }
        fetchData();
    }, [data]);
    useEffect(()=>{
        if(allItems.length>0){
            if(search){
                setTableItems(allItems.filter((item)=>item.C_NOMBRE.includes(search)))
            }else{
                setTableItems(allItems)
            }
        }
        
       
    }, [search,allItems]);

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
            <div className="table-lists fundTable">
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
export const ProjectManagementTable = ({header1,header2,header3,header4,header5,header6,data,language,setProjectStatus}) => {
    const [tableItems, setTableItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [allItems, setAllItems] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
        setLoading(true);
        const res = data ;
        setSearch('')
        setAllItems(res)
        setTableItems(res);
        setLoading(false);
        const searchs = document.querySelector('.header-web .second-part .show .search-container input');
            if(searchs){
                searchs.addEventListener('input',(event)=>{
                    setSearch(event.target.value);
                })
            }
        }
        fetchData();
    }, [data]);

    useEffect(()=>{
        if(allItems.length>0){
            if(search){
                setTableItems(allItems.filter((item)=>(item.C_NOMBRE_PROYECTO.includes(search))))
            }else{
                setTableItems(allItems)
            }
        }
    }, [search,allItems]);
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
                            <ProjectItem key={i} info={info} setProjectStatus={setProjectStatus} />    
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


export const RiskTable = ({header1,header2,header3,data,language,refreshs}) => {
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
            <div className="table-lists projectTable riskTable">
                <ul className="listHeader">
                    <li className='listHeaderItem'>{header1}</li>
                    <li className='listHeaderItem'>{header2}</li>
                    <li className='listHeaderItem'>{header3}</li>
                </ul>
                {
                    currentItems.map((info,i)=>{
                        return(
                            <RiskItem key={i} info={info} language={language} refresh={refreshs}/>
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

export const BillingTable = ({header1,header2,header3,header4,data,currentPage,setCurrentPage}) => { 
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
            <div className="table-lists billingTable">
                <ul className="listHeader">
                    <li className='listHeaderItem'>{header1}</li>
                    <li className='listHeaderItem'>{header2}</li>
                    <li className='listHeaderItem'>{header3}</li>
                    <li className='listHeaderItem'>{header4}</li>
                </ul>
                {
                    currentItems.map((info,i)=>{
                        return(
                            <BillingItem key={i} info={info} />
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
export const BillingDetailTable = ({header1,header2,header3,header4,header5,header6,data,currentPage,setCurrentPage,funcionFacts}) => { 
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
            <div className="table-lists billingTable">
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
                            <BillingDetailItem key={i} info={info}  funcionFact={funcionFacts}/>
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
export const BankConfigTable = ({header1,header2,header3,header4,header5,data,currentPage,setCurrentPage}) => { 
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
            <div className="table-lists bankConfig">
                <ul className="listHeader">
                    <li className='listHeaderItem'>{header1}</li>
                    <li className='listHeaderItem'>{header2}</li>
                    <li className='listHeaderItem'>{header3}</li>
                    <li className='listHeaderItem'>{header4}</li>
                    <li className='listHeaderItem'>{header5}</li>
                </ul>
                {
                    currentItems.map((info,i)=>{
                        return(
                            <BankConfigItem key={i} info={info} />
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
export const ContractManagementTable = ({header1,header2,header3,header4,header5,data,link,currentPage,setCurrentPage,opcion}) => { 
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
            <div className="table-lists ContractManagement">
                <ul className="listHeader">
                    <li className='listHeaderItem'>{header1}</li>
                    <li className='listHeaderItem'>{header2}</li>
                    <li className='listHeaderItem'>{header3}</li>
                    <li className='listHeaderItem'>{header4}</li>
                    <li className='listHeaderItem'>{header5}</li>
                </ul>
                {
                    currentItems.map((info,i)=>{
                       return( <ContractManagementItem key={i} info={info} link={link} opcions={opcion} />)
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

export const InvoiceTable = ({language, data}) => {
    return(
        <div className="table">
            <div className="responsiveFix">
                <div className="responsiveAuto">
                    <ul className="listHeader">
                        <li className="listItem listHeaderItem">N° Lists applied</li>
                        <li className="listItem listHeaderItem">Value</li>
                        <li className="listItem listHeaderItem">Actions</li>
                    </ul>
                    {
                        data.map((info,i)=>{
                            return(
                                <InvoiceItem key={i} info={info} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export const RevenueTable1 = ({language, data,showpago}) => {
    return(
        <>
         <div className="table">
            <div className="responsiveFixBoth">
                <div className="responsiveAutoBoth">
                    <p className="revenueTableTitle">{language.revenues.table1_title}</p>
                    <ul className="listHeader">
                        <li className="listItem listHeaderItem">{language.revenues.table1_head1}</li>
                        <li className="listItem listHeaderItem">{language.revenues.table1_head2}</li>
                        <li className="listItem listHeaderItem">{language.revenues.table1_head3}</li>
                    </ul>
                    {
                        data.map((info,i)=>{
                            return(
                                <RevenueItem1 key={i} info={info} />
                            )
                        })
                    }
                </div>
            </div>
            <div className="Esheet-submit pago-button">
            <Button text={language.revenues.configcardPaymen} background={`var(--primary-color)`} types={`button`} click={showpago} />
            </div>
        </div>
        
        </>
       
        
    )
}
export const RevenueTable2 = ({language, data,setPagoManuals,setPagoInversion,SetPagoOtro}) => {
    return(
        <div className="table">
            <div className="responsiveFix">
                <div className="responsiveAuto">
                    <p className="revenueTableTitle">{language.revenues.table2_title}</p>
                    <ul className="listHeader">
                        <li className="listItem listHeaderItem">{language.revenues.table2_head1}</li>
                        <li className="listItem listHeaderItem">{language.revenues.table2_head2}</li>
                        <li className="listItem listHeaderItem">{language.revenues.table2_head3}</li>
                        <li className="listItem listHeaderItem">{language.revenues.table2_head4}</li>
                        <li className="listItem listHeaderItem">{language.revenues.table2_head5}</li>
                        <li className="listItem listHeaderItem">Acc{language.revenues.table2_head6}</li>
                    </ul>
                    {
                        data.map((info,i)=>{
                            return(
                                <RevenueItem2 key={i} info={info} setPagoManual={setPagoManuals}  setPagoInversionista={setPagoInversion}  setPagoOtros={SetPagoOtro}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export const TablePermision = ({language,data,deletes}) => {
    return(

        <div className="table">
            <div className="table-lists">
                <div className="fundTable">
                    <ul className="listHeader">
                    <li className="listItem listHeaderItem">ID</li>
                    <li className="listItem listHeaderItem">Country</li>
                    <li className="listItem listHeaderItem">Acciones</li>
                    </ul>
                    {
                        data.map((info,i)=>{
                            return(
                                <ItemPermision key={i} info={info} setDelete={deletes} index={i} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export const ConfigurationSettingTable = ({language,data,link}) => { 
    const [tableItems, setTableItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [itemsPerPage] = useState(5);
    const [currentItems, setCurrentItems] = useState([]);
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
            <div className="table-lists ContractManagement">
                <ul className="listHeader">
                    <li className='listHeaderItem'>{language.config_File.numerplant}</li>
                    <li className='listHeaderItem'>{language.config_File.nombreplnat}</li>
                    <li className='listHeaderItem'>Actions</li>
                </ul>
                {
                    currentItems.map((info,i)=>{
                       return( <ConfigurationSettingItem key={i} info={info} link={link} />)
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



export const LastPagoTable2 = ({language, data}) => {
    return(
        <div className="table LastPagoTable">
            <div className="responsiveFix">
                <div className="responsiveAuto">
                    <ul className="listHeader">
                        <li className="listItem listHeaderItem">Detalle</li>
                        <li className="listItem listHeaderItem">Centro costo</li>
                        <li className="listItem listHeaderItem">Cantidad</li>
                        <li className="listItem listHeaderItem">V/ Unidad</li>
                        <li className="listItem listHeaderItem">V/ total</li>
                        <li className="listItem listHeaderItem">% Descuento</li>
                        <li className="listItem listHeaderItem">% Iva</li>
                        <li className="listItem listHeaderItem">% Retención</li>
                        <li className="listItem listHeaderItem">V/ Neto</li>
                    </ul>
                    {
                        data.map((info,i)=>{
                            return(
                                <LastPagoItem2 key={i} info={info} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export const LastPagoTable = ({language, data}) => {
    return(
        <div className="table LastPagoTable">
            <div className="responsiveFix">
                <div className="responsiveAuto">
                    <ul className="listHeader">
                        <li className="listItem listHeaderItem">Pago</li>
                        <li className="listItem listHeaderItem">Fecha</li>
                        <li className="listItem listHeaderItem">Porcentaje</li>
                        <li className="listItem listHeaderItem">Saldo a la fecha</li>
                        <li className="listItem listHeaderItem">Valor a pagar</li>
                    </ul>
                    {
                        data.map((info,i)=>{
                            return(
                                <LastPagoItem key={i} info={info} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}


export const ExpenseTable = ({header1,header2,header3,header4,data,language}) => {
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
            <div className="table-lists fundTable">
                <ul className="listHeader">
                    <li className='listHeaderItem'>{header1}</li>
                    <li className='listHeaderItem'>{header2}</li>
                    <li className='listHeaderItem'>{header3}</li>
                    <li className={`listHeaderItem`}>{header4}</li>
                </ul>
                {
                    currentItems.map((info,i)=>{
                        return(
                            <ExpensesItem key={i} info={info} />    
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

export const GatosTable = ({header1,header2,header3,header4,header5,header6,header7,data}) => { 
    const [currentPage, setCurrentPage] = useState(1);
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
            <div className="table-lists billingTable">
                <ul className="listHeader">
                    <li className='listHeaderItem' style={{width: '10%'}}>{header1}</li>
                    <li className='listHeaderItem' style={{width: '14%'}}>{header2}</li>
                    <li className='listHeaderItem' style={{width: '20%'}}>{header3}</li>
                    <li className='listHeaderItem' style={{width: '14%'}}>{header4}</li>
                    <li className='listHeaderItem' style={{width: '14%'}}>{header5}</li>
                    <li className='listHeaderItem' style={{width: '14%'}}>{header6}</li>
                    <li className='listHeaderItem' style={{width: '10%'}}>{header7}</li>
                </ul>
                {
                    currentItems.map((info,i)=>{
                        return(
                            <GatosItem key={i} info={info}/>
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

export const UtilidadesTable1 = ({language, data, setUtil, setFinanciera}) => {
    return(
        <>
         <div className="table">
            <div className="responsiveFixBoth">
                <div className="responsiveAutoBoth">
                    <p className="revenueTableTitle">{`Resultados de la carga contable`}</p>
                    <ul className="listHeader">
                        <li className="listItem listHeaderItem">{`Código`}</li>
                        <li className="listItem listHeaderItem">{`Tipo`}</li>
                        <li className="listItem listHeaderItem">{`Concepto`}</li>
                        <li className="listItem listHeaderItem">{`Movimiento`}</li>
                        <li className="listItem listHeaderItem">{`Estado `}</li>
                    </ul>
                    {
                        data.map((info,i)=>{
                            return(
                                <UtilidadesItem1 key={i} info={info} />
                            )
                        })
                    }
                </div>
            </div>
            <div className="Esheet-submit pago-button">
                <span onClick={()=>{window.scrollTo(0, document.body.scrollHeight);setUtil(true);setFinanciera('open')}} >
                    <Button text={language.revenues.configcardPaymen} background={`var(--primary-color)`} types={`button`} />
                </span>
            </div>
        </div>
        
        </>
       
        
    )
}
export const UtilidadesTable2 = ({language, data}) => {
    return(
        <div className="table">
            <div className="responsiveFix">
                <div className="responsiveAuto">
                    <p className="revenueTableTitle">{`Resultados del cruze de  información del archivo contable  VS  la plataforma`}</p>
                    <ul className="listHeader">
                        <li className="listItem listHeaderItem">{`Código`}</li>
                        <li className="listItem listHeaderItem">{`Tipo`}</li>
                        <li className="listItem listHeaderItem">{`Concepto`}</li>
                        <li className="listItem listHeaderItem">{`Estado`}</li>
                        <li className="listItem listHeaderItem">{`Validación`}</li>
                        <li className="listItem listHeaderItem">{`Acciones`}</li>
                    </ul>
                    {
                        data.map((info,i)=>{
                            return(
                                <UtilidadesItem2 key={i} info={info}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}