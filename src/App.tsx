import React, {FC} from 'react';
import {GlobalStyles} from "./styles";
import {AdvisorList} from "./components";

const App: FC = () => {
    return (
        <div>
            <GlobalStyles />
            <AdvisorList/>
        </div>
    );
};

export default App;