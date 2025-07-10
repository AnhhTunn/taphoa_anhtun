import React from 'react'
const ServiceItem = (props) => {
    const { title, image } = props.dataService;
    return (
        <div className='col l-3 m-6 c-6' style={{margin:"0"}}>
            <div className="flex items-center gap-3 pl-15 p-4">
                <img src={image} alt={title} className="w-10 h-10 object-contain" />
                <span className="text-sm md:text-base font-semibold text-center">{title}</span>
            </div>
        </div>
    )
}

export default ServiceItem
