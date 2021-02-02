import axios from 'axios';
import React , { useEffect, useState } from 'react';
import './giphy.scss';
import Loader from '../loader/loader';



const Giphy = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]); 
    const [search, setSearch] = useState("");
    // const [currentPage, setCurrentPage] = useState(1);
    // const [itemsPerPage, setItemsPerPage] = useState(12);
    // const lastItemIndex = currentPage * itemsPerPage;
    // const firstItemIndex = lastItemIndex - itemsPerPage;
     

    const fetchGif = () => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try{
                const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                params: {
                    api_key: "X4hYOXoS6tKkZfdVRY4Nwwr00LIFMw5d",
                    limit: 12,
                    offset: 12
                    }
                },);
                setData(results.data.data);
                console.log(results.data.data)

            }catch (err) {
                setIsError(true);
                setTimeout(() => {
                    setIsError(false);
                }, 5000);

            }
            setIsLoading(false);
        }

        fetchData()
    }
    useEffect(() => {
       fetchGif();
    },[]);

    const renderGifs = () => {
        if(isLoading){
            return <Loader/> 
        }
        return data.map(item => {
            return (
                <div key={item.id} className="container gif">
                    <img alt={item.slug} src={item.images.downsized.url}/>
                </div>
            )
            
        })
    
    }

    const renderError = () => {
        if(isError){
            return(
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    Unable to get Gifs, please try again in a few minutes
                </div>
            )
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setIsError(false);
        setIsLoading(true)
        try{
            const results = await axios("https://api.giphy.com/v1/gifs/search", {
            params: {
                api_key: "X4hYOXoS6tKkZfdVRY4Nwwr00LIFMw5d",
                q: search,
                limit: 12
            }
        });
        setData(results.data.data);
        } catch (err){
            setIsError(true);
            setTimeout(() => {
                setIsError(false);
            }, 5000);
        }
        setIsLoading(false);
    };

    return(
        <div className="wrap">
            {renderError()}
            <form className="input-form form-inline justify-content-center">
                <input value={search} onChange={handleSearch} type="text" placeholder="Search" className="form-control"/>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Go</button>
            </form>
        <div className="container gifs">
        {renderGifs()}
        </div>
        </div>
        ) 
    
}

export default Giphy


// return data.map(item => {
//     return (
//         <div key={item.id} className="container gif">
//             <img alt={item.slug} src={item.images.downsized.url}/>
//         </div>
//     )
    
// })