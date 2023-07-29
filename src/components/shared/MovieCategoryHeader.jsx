import React from 'react';

const MovieCategoryHeader = ({title}) => {
    return (
        <div>
            <h1 className='text-gray-700 mt-10 mb-5 px-4 uppercase text-3xl font-bold'>{title}
            <div className="divider"></div>
            </h1>
        </div>
    );
};

export default MovieCategoryHeader;