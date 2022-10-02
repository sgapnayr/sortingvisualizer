import React, { useEffect, useState } from 'react'
import { getMergeSortAnimations } from '../SortingAlgorithmns/sortingAlgorithmns';
import './SortingVisualizer.css'

const ANIMATION_SPEED_MS = 30;

const NUMBER_OF_ARRAY_BARS = 20;

const PRIMARY_COLOR = `rgb(39, 35, 44)`;

const SECONDARY_COLOR = `rgba(0, 213, 255, .75)`;

function SortingVisualizer() {
    const [array, setArray] = useState([82, 205, 148, 398, 452, 77, 42, 203, 407, 66, 279, 245, 273, 438, 397, 112, 259, 235, 201, 119])
    const [isSorting, setIsSorting] = useState(false)

    const resetArray = () => {
        const array = []
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomNumber(25, 500))
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

    useEffect(() => {
        resetArray
    }, [])


    return (
        <>
            <div className="title e">
                <h2><strong>Sorting Visualizer</strong></h2>
            </div>

            <div className="titleReflection">asdf</div>

            <div className="Wrapper">
                <div className="arrayContainer">
                    {array.map((value, idx) => {
                        return (
                            <div className={isSorting ? 'reset' : 'arrayBar'} key={idx} style={{ height: `${value}px` }}>
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
        </>
    )
}

export default SortingVisualizer