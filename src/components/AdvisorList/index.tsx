import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import styled from 'styled-components';

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

const SortButton = styled.button`
  margin-right: 8px;
`;
const AdvisorList: React.FC = () => {
    const [advisors, setAdvisors] = useState<any[]>([]);
    const [filteredAdvisors, setFilteredAdvisors] = useState<any[]>(advisors);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [filterStatus, setFilterStatus] = useState<string | null>(null);
    const [filterLanguage, setFilterLanguage] = useState<string | null>(null);
    console.log('filteredAdvisors', filteredAdvisors)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/advisors');
                const { data } = response;
                await new Promise((resolve) => setTimeout(resolve, API_DELAY));
                setAdvisors(data);
            } catch (error) {
                console.error('Error fetching advisors:', error);
            }
        };

        fetchData();
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


    const handleFilterStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStatus = event.target.value;
        if (selectedStatus === "") {
            setFilterStatus(null);
        } else {
            setFilterStatus(selectedStatus);
        }
    };

    const handleFilterLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value;
        if (selectedLanguage === "") {
            setFilterLanguage(null);
        } else {
            setFilterLanguage(selectedLanguage);
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
            <div>
                <SortButton onClick={handleSortClick}>Sort by Reviews ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})</SortButton>
                <label>
                    Filter by Status:
                    <select value={filterStatus || ''} onChange={handleFilterStatusChange}>
                        <option value="">All</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                </label>
                <label>
                    Filter by Language:
                    <select value={filterLanguage || ''} onChange={handleFilterLanguageChange}>
                        <option value="">All</option>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                    </select>
                </label>
            </div>

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