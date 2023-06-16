import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { fetchData } from "../../api";
import FiltersList from "../FiltersList/FiltersList";


const API_DELAY = 1000; // Имитация задержки ответа сервера

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
    console.log('filteredAdvisors', filteredAdvisors)

    useEffect(() => {
        const getData = async () => {
            const data = await fetchData();
            setAdvisors(data);
        };

        getData();
    }, []);


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