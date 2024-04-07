import React from 'react'
import {Helmet} from "react-helmet-async"

const Title = ({title = "ConvoSphere", description = "This is a chatApp"}) => {
    
  return (
    <Helmet>
        <title>
            {title}
        </title>
        <meta name="description" content={description} />
    </Helmet>
  )
}

export default Title

// The Helmet component is used to manage the document head of a React application, allowing you to dynamically set various meta tags, including title and description.