import React from 'react';
import LandingPage from "./components/LandingPage";

class Home extends React.Component {

    render() {
        return(
            <div style={{background: "linear-gradient(to right, #2c3e50, #4ca1af)"}}>
                <LandingPage/>
            </div>
        );
    }
}

export default Home;