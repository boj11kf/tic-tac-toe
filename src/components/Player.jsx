import React from 'react';

const Player = ({ initialName, symbol, isActive, onChangeName }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [name, setName] = React.useState(initialName);

    const handleEditClick = () => {
        setIsEditing((editing) => !editing);

        if (isEditing) {
            onChangeName(symbol, name);
        }
       
    }

    const handleNameChange = (event) => {
        setName(() => event.target.value);
    }
    let playerName = <span className="player-name">{name}</span>

    if(isEditing) playerName = <input type='text' required value={name} onChange={handleNameChange}/>

    return (
        <li className={isActive ? "active" : undefined}>
            <span className='player'>
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
};

export default Player;