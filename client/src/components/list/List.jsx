import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons';
import { useRef, useState } from 'react';
import ListItem from '../listItem/ListItem';
import './list.scss';

const List = ( { list } ) => {

    const [ slideNumber, setSlideNumber ] = useState(0)
    const [ isMoved, setIsMoved ] = useState(false);
    const [ clickLimit,  ] = useState(window.innerWidth / 230); //el ancho que le dé

    const listRef = useRef();


    const handleClick = (direction) => {

        setIsMoved(true)
        let distance = listRef.current.getBoundingClientRect().x - 50; //le quito el margin-left de 50px que le di

        if (direction === 'left' && slideNumber > 0) {
            setSlideNumber(slideNumber - 1)
            listRef.current.style.transform = `translateX(${230 + distance}px)`
        }
        //el 5 no puede venir hardcodeado
        if (direction === 'right' && slideNumber < 10 - clickLimit) {
            setSlideNumber(slideNumber + 1)
            listRef.current.style.transform = `translateX(${-230 + distance}px)`
        }
        // console.log(distance)
    }

    return (
        <div className="list">
            <span className="listTitle">{list.title}</span>
            <div className="wrapper">
                <ArrowBackIosOutlined 
                  className="sliderArrow left"
                  onClick={() => handleClick('left')}
                  style={{ display: !isMoved && "none"}}
                />
                <div className="container" ref={listRef}>
                { list.content.map( (item,i) =>(
                        <ListItem key={i} index={i} item={item}/>
                ))}
                </div>
                <ArrowForwardIosOutlined className="sliderArrow right"
                    onClick={() => handleClick('right')}
                />

            </div>

        </div>
    )
}

export default List
