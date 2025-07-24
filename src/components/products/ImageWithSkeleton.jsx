import { Skeleton } from '@mui/material'
import React, { useState } from 'react'

const ImageWithSkeleton = ({ src, alt, onLoad }) => {
    const [loaded, setLoaded] = useState(false)

    const handleLoad = () => {
        setLoaded(true)
        if (onLoad) onLoad()
    }

    return (
        <div className="w-full h-full overflow-hidden rounded-xl">
            {!loaded && (
                <Skeleton variant="rectangular" width="100%" height="250px" animation="wave" />
            )}
            <img
                src={src}
                alt={alt}
                onLoad={handleLoad}
                style={{ display: loaded ? 'block' : 'none', width: '100%', height: 'auto' }}
            />
        </div>
    )
}

export default ImageWithSkeleton
