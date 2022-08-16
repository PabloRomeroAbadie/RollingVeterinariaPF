import React from 'react';
import Ramiro from './Ramiro/Ramiro';
import Pablo from './pablo/Pablo';
import Intro from './intro/Intro';


const SobreNosotros = () => {
    return (
        <div>

            <Intro/>
            <div className='container'>
            <Ramiro/>
            <hr />
            <Pablo/>
            </div>
        </div>

    );
};

export default SobreNosotros;