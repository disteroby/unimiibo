import style from './AmiiboCard.module.css'
import {Link} from "react-router-dom";
import placeholder404 from '../../assets/Placeholder/amiibo_placeholder_404.png'
import React, {useState} from "react";
import {seriesMapPalette} from "../../utilities/Colors";
import {strHashCode} from "../../utilities/Utils";

const palette = {
    pink: {
        gradient: style.pinkGradient,
        border: 'pinkBorder'
    },
    red: {
        gradient: style.redGradient,
        border: 'redBorder'
    },
    orange: {
        gradient: style.orangeGradient,
        border: 'orangeBorder'
    },
    yellow: {
        gradient: style.yellowGradient,
        border: 'yellowBorder'
    },
    green: {
        gradient: style.greenGradient,
        border: 'greenBorder'
    },
    blue: {
        gradient: style.blueGradient,
        border: 'blueBorder'
    },
    purple: {
        gradient: style.purpleGradient,
        border: 'purpleBorder'
    },
    grey: {
        gradient: style.greyGradient,
        border: 'greyBorder'
    }
};

let paletteKeys = Object.keys(palette);

function indexSeries(series) {
    return strHashCode(series) % paletteKeys.length;
}

function AmiiboCard({amiibo, reactive = false}) {

    const {id, name, character, series, img} = amiibo;
    const [isLoading, setIsLoading] = useState(true);

    let index = indexSeries(series);
    let color = palette[seriesMapPalette[series]] ? seriesMapPalette[series] : paletteKeys[index];
    let chosenPalette = palette[color];

    const card = (
        <>
            <div className={`${style.bgCard} ${chosenPalette.gradient}`}/>
            <div className={`${style.border} ${chosenPalette.border}`}/>
            {!isLoading ? '' : (
                <div className={`${style.loadingSpinner}`}>
                    <div className="text-center">
                        <div className={`spinner-border ${color}`} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            )}
            <img className={`${style.amiiboImg} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                 src={img}
                 loading="lazy"
                 placeholder={placeholder404}
                 alt={`[${character}] - ${name}`}
                 onError={(e) => e.target.src = placeholder404}
                 onLoad={() => setIsLoading(false)}
            />
            <div className={style.myCardTextPosition}>
                <div className={`${style.myCardTextWrapper}`}>
                    <div className={`${style.myCardTextName} text-truncate`}>{name}</div>
                    <div className={`${style.myCardTextSeries} text-truncate`}>{series}</div>
                </div>
            </div>
        </>
    );

    return (
        <div className="d-flex justify-content-center">
            {
                reactive ?
                <Link to={`/unimiibo/amiibo-details/${id}`} className={`${style.myCard}`}>
                    {card}
                </Link> :
                <div className={`${style.myCard}`}>
                    {card}
                </div>
            }
        </div>
    );
}

export default AmiiboCard;