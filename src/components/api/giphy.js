import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './giphy.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container } from 'react-bootstrap';



const Giphy = () => {

    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [validated, setValidated] = useState(true);

    const fetchGif = () => {
        formValidation();
        const fetchData = async () => {
            setIsError(false);
            try {
                const results = await axios(`https://api.giphy.com/v1/gifs/search`, {
                    params: {
                        api_key: "X4hYOXoS6tKkZfdVRY4Nwwr00LIFMw5d",
                        limit: 12,
                        offset: currentPage * 12,
                        q: search
                    }
                });

                setData((prevState) => [
                    ...prevState,
                    ...results.data.data
                ])

                setCurrentPage(currentPage + 1)

            } catch (err) {
                setIsError(true);
                setTimeout(() => {
                    setIsError(false);
                }, 5000);

            }
        }

        fetchData()
    }
    useEffect(() => {
        fetchGif();
    }, []);

    const renderGifs = () => {
        return <InfiniteScroll className="wrapper" dataLength={data.length} next={() => fetchGif()} hasMore={true}>
            {data.map((item, idx) => {
                return (
                    <Container key={idx} className="container gif">
                        <img alt={item.slug} src={item.images.downsized.url} />
                    </Container>
                )
            })}
        </InfiniteScroll>

    }

    const renderError = () => {
        if (isError) {
            return (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    Unable to get Gifs, please try again in a few minutes
                </div>
            )
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const formValidation = () => {
        let isValid = false;
        const nameValid = /[^A-Za-z0-9]+/g;
        if (nameValid.test(search)) {
            isValid = true;
            setValidated(true);
        } else {
            setValidated(false);
        }
        return isValid;

    }

    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = formValidation();

    }

    const handleSubmit = async e => {
        if (!formValidation()) {
            e.preventDefault();
            formValidation();
            setIsError(false);
            try {
                const results = await axios("https://api.giphy.com/v1/gifs/search", {
                    params: {
                        api_key: "X4hYOXoS6tKkZfdVRY4Nwwr00LIFMw5d",
                        q: search,
                        limit: 12,
                    }
                });

                setData(results.data.data)

            } catch (err) {
                setIsError(true);
                setTimeout(() => {
                    setIsError(false);
                }, 5000);

            }
        }
        

    };

    return (
        <div className="wrap">
            {renderError()}
            <form onSubmit={onSubmit} className="input-form form-inline justify-content-center">
                <input value={search} autoFocus required onChange={handleSearch} type="text" placeholder="Search for GIFS" className="form-control animate" />
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Go</button>
            </form>
            <div style={{ right: validated ? 0 : `${-20}%` }} className={validated ? "error active " : "error"}>Please input only characters and numbers</div>
            <div className="container gifs">
                {renderGifs()}
            </div>
        </div>
    )

}

export default Giphy
