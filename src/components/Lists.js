import React from 'react';

const Lists = ({items,removeItem,editItem}) =>{
    return (
        <div className="grocery-list">
        {
            items.map((item)=>{
                const {id ,title} = item;
                return(
                    <div className="grocery-item" key={id}>
                        <p className="title">{title}</p>
                        <div className="btn-container">
                            <button className="edit-btn" type="button" onClick={()=>editItem(id)}>Edit</button>
                            <button className="delete-btn" type="button" onClick={()=>removeItem(id)}>Remove</button>
                        </div>
                    </div>
                )
            })
            
        }
        </div>
    )
}

export default Lists;