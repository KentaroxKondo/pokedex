import React from 'react'
import './Card.css';

const Card = ({ pokemon }) => {
    return (
        <div className='card'>
            <img src={pokemon.sprites.front_default} alt={`${pokemon.name}の画像`} />

            <h2 className='cardHeading'>{pokemon.name}</h2>

            <ul className='cardUl'>
                <li>
                    <h3 className='cardSubHeading'>タイプ</h3>：
                    <ul className='cardDescriptionUl'>
                        {pokemon.types.map((type) => {
                            return (
                                <li key={type.type.name}>{type.type.name}</li>
                            )
                        })}
                    </ul>
                </li>

                <li><h3 className='cardSubHeading'>重さ</h3>：{pokemon.weight}</li>

                <li><h3 className='cardSubHeading'>高さ</h3>：{pokemon.height}</li>

                <li>
                    <h3 className='cardSubHeading'>アビリティ</h3>：
                    <ul className='cardDescriptionUl'>
                        {pokemon.abilities.map((ability) => {
                            return (
                                <li key={ability.ability.name}>{ability.ability.name}</li>
                            )
                        })}
                    </ul>
                </li>
            </ul >
        </div>
    )
}

export default Card