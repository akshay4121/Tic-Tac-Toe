import { useState } from "react";

export default function Player({name, symbol}){
    const [isEditing, setIsEditing] = useState(false);

    function handleEdit(){
        setIsEditing((editing) => !isEditing);
    }

    let PlayerName = <span className="player-name">{name}</span>;

    if(isEditing){
        PlayerName = <input type="text" required value={name}/>;
    }
    return (
        <li>
        <span className="player">
        { PlayerName}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
       </li>
    );
}