import React, { Component } from 'react'

const About = (props) => {
    const { clickFetch } = props
    return (
        <div>
            this is component About <br />
            import when need <br />
            <button onClick={() => clickFetch()} >TestFetch</button>
        </div>
    )
}

export default About