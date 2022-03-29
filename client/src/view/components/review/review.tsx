import { Rating } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React from "react";
import './review.scss'
interface cardProps {
    comment: string;
    name: string;
    stars: number;
    date: Date;
    userId: string,
    restId: string,
    _id: string;
}
function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
function Review(props: cardProps) {
    const date = new Date(props.date)
    let strDate = 'y/m/d h:t'
        .replace('y', "" + date.getFullYear())
        .replace('m', "" + (date.getMonth() + 1))
        .replace('d', "" + date.getDate())
        .replace('h', "" + date.getHours())
        .replace('t', "" + date.getMinutes())
    return (
        <div className="review">
            <div className="review__left">
                <Avatar {...stringAvatar(props.name)} />
            </div>
            <div className="review__right">
                <div className="review__right__top">
                    <Rating name="read-only" value={props.stars} readOnly />
                    <span className="review__right__top__date" >posted on {strDate}</span>
                </div>
                <div className="review__right__bottom">
                    {props.comment}
                </div>
            </div>
        </div>
    )
}
export default Review