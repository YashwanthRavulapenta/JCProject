import React from 'react'
import { Link } from 'react-router-dom'

const Card = (props) => {
  return (
    <>
        <div className="card" style={{width:"240px"}}>
            <img src={props.user.avatar_url} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                <Link to={`users/${props.user.id}`}>userInfo</Link>
            </div>
        </div>
    </>
  )
}

export default Card