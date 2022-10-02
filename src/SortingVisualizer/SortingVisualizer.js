import React, { useEffect, useState } from 'react'
import { getMergeSortAnimations } from '../SortingAlgorithmns/sortingAlgorithmns';
import './SortingVisualizer.css'
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const ANIMATION_SPEED_MS = 30;

const NUMBER_OF_ARRAY_BARS = 20;

const PRIMARY_COLOR = `rgb(39, 35, 44)`;

const SECONDARY_COLOR = `rgba(0, 213, 255, .75)`;

function SortingVisualizer() {
    const [array, setArray] = useState([158, 154, 194, 78, 61, 252, 225, 315, 262, 224, 323, 67, 216, 318, 151, 71, 303, 192, 176, 299])

    const resetArray = () => {
        const array = []
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomNumber(25, 325))
        }
        setArray(array)
    }

    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const mergeSort = () => {
        const animations = getMergeSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('arrayBar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    return (
        <>
            <div className="App" data-aos='fade' data-aos-duration='700'>
                <div className="title" data-aos='fade-down' data-aos-duration='700'>
                    <h2><strong>Sorting Visualizer</strong></h2>
                </div>

                <div className="titleReflection" >asdf</div>

                <div className="Wrapper">
                    <div className="arrayContainer">
                        {array.map((value, idx) => {
                            return (
                                <div className='arrayBar' key={idx} style={{ height: `${value}px` }}>
                                    .
                                </div>
                            )
                        })}
                    </div>
                    <div className="buttonContainer">
                        <button onClick={() => resetArray(PRIMARY_COLOR, SECONDARY_COLOR)}>Reset</button>
                        <button onClick={() => mergeSort(array)}>Sort</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SortingVisualizer