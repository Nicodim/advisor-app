import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import FiltersList from "../FiltersList/FiltersList";
import axios from "axios";


const API_DELAY = 2000; // Имитация задержки ответа сервера

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const AdvisorCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
`;

const AdvisorList: React.FC = () => {
    const [advisors, setAdvisors] = useState<any[]>([]);
    const [filteredAdvisors, setFilteredAdvisors] = useState<any[]>(advisors);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [filterStatus, setFilterStatus] = useState<string | null>(null);
    const [filterLanguage, setFilterLanguage] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1)
    const [fetching, setFetching] = useState(true)
    console.log('filteredAdvisors', filteredAdvisors)

    useEffect(() => {
        if (fetching) {
            setTimeout(() => {
                axios.get(`/api/advisors?limit=20&=${currentPage}`)
                    .then(response => {
                        setAdvisors([...advisors, ...response.data])
                        setCurrentPage(prevState => prevState + 1)
                    })
                    .finally(() => setFetching(false))
            }, API_DELAY);
        }
    }, [fetching]);


    const scrollHandler = () => {
        const isScrolledToBottom =
            document.documentElement.scrollHeight -
            (window.innerHeight + document.documentElement.scrollTop) <
            100;
        if(isScrolledToBottom) {
            setFetching(true)
        }
    }

    useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
        return function () {
        document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const sortAdvisors = useCallback(() => {
        const sortedAdvisors = [...advisors];
        sortedAdvisors.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.reviews - b.reviews;
            } else {
                return b.reviews - a.reviews;
            }
        });
        setFilteredAdvisors(sortedAdvisors);
    }, [advisors, sortOrder]);


    const filterAdvisors = useCallback(() => {
        let filteredData = advisors;
        if (filterStatus) {
            filteredData = filteredData.filter(
                (advisor) => advisor.status === filterStatus
            );
        }
        if (filterLanguage) {
            filteredData = filteredData.filter((advisor) =>
                advisor.languages.includes(filterLanguage)
            );
        }
        setFilteredAdvisors(filteredData);
    }, [advisors, filterStatus, filterLanguage]);


    const handleSortClick = () => {
        setSortOrder((prevSortOrder) =>
            prevSortOrder === 'asc' ? 'desc' : 'asc'
        );
    };

    const handleFilterChange = (filterType: string , selectedValue: string | null) => {
        if (filterType === 'status') {
            setFilterStatus(selectedValue);
        } else if (filterType === 'language') {
            setFilterLanguage(selectedValue);
        }
    };

    useEffect(() => {
        sortAdvisors();
    }, [sortOrder, sortAdvisors]);

    useEffect(() => {
        filterAdvisors();
    }, [filterStatus, filterLanguage, filterAdvisors]);

    console.log('filterLanguage', filterLanguage)
    return (
        <Container>
            <FiltersList
                filterStatus={filterStatus}
                filterLanguage={filterLanguage}
                handleSortClick={handleSortClick}
                handleFilterChange={handleFilterChange}
            />

            {advisors.length === 0 ? (
                <p>Loading...</p>
            ) :
                (filteredAdvisors.map((advisor) => (
                <AdvisorCard key={advisor.id}>
                    <h3>{advisor.name}</h3>
                    <p>Status: {advisor.status}</p>
                    <p>Languages: {advisor.languages.join(", ")}</p>
                    <p>Reviews: {advisor.reviews}</p>
                </AdvisorCard>
            )))}
        </Container>
    );

};

export default AdvisorList;