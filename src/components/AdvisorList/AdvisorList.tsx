import React, {useState, useEffect, useCallback} from 'react';
import FiltersList from "../FiltersList/FiltersList";
import axios from "axios";
import {AdvisorCard, Container} from "./styles";
import {Advisor} from "./types";
import { API_DELAY } from "../../constants";



const AdvisorList: React.FC = () => {
    const [advisors, setAdvisors] = useState<Advisor[]>([]);
    const [filteredAdvisors, setFilteredAdvisors] = useState<Advisor[]>(advisors);
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

    const handleSortClick = () => {
        setSortOrder((prevSortOrder) =>
            prevSortOrder === 'asc' ? 'desc' : 'asc'
        );
    };

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

    const handleFilterChange = (filterType: string , selectedValue: string | null) => {
        if (filterType === 'status') {
            setFilterStatus(selectedValue);
        } else if (filterType === 'language') {
            setFilterLanguage(selectedValue);
        }
    };

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

            {filteredAdvisors.length === 0 ? (
                <p>Loading...</p>
            ) :
                (filteredAdvisors.map((advisor) => (
                <AdvisorCard key={advisor.id}>
                    <h3>{advisor.name}</h3>
                    <p><span>Status:</span> {advisor.status}</p>
                    <p><span>Languages:</span> {advisor.languages.join(", ")}</p>
                    <p><span>Reviews:</span> {advisor.reviews}</p>
                </AdvisorCard>
            )))}
        </Container>
    );

};

export default AdvisorList;