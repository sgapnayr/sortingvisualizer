import React, { useEffect, useState } from 'react'
import { getMergeSortAnimations } from '../SortingAlgorithmns/sortingAlgorithmns';
import './SortingVisualizer.css'

const ANIMATION_SPEED_MS = 15;

const NUMBER_OF_ARRAY_BARS = 25;

const PRIMARY_COLOR = 'rgb(0, 213, 255)';

const SECONDARY_COLOR = 'rgb(255, 40, 251)';

function SortingVisualizer() {
    const [array, setArray] = useState([])

    const resetArray = () => {
        const array = []
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomNumber(10, 400))
        }
        setArray(array)
    }

    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    /* Testing */
    function arraysAreEqual(arrayOne, x) {
        if (arrayOne.length !== arrayTwo.length) return false;
        for (let i = 0; i < arrayOne.length; i++) {
            if (arrayOne[i] !== arrayTwo[i]) {
                return false;
            }
        }
        return true;
    }

    /* Sorting Algo */
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

    const testSortingAlgorithms = () => {
        for (let i = 0; i < 250; i++) {
            const array = [];
            const length = randomNumber(1, 1000);
            for (let i = 0; i < length; i++) {
                array.push(randomNumber(-1000, 1000));
            }
            const javaScriptSortedArray = array.sort((a, b) => a - b);
            const mergeSortedArray = mergeSort(array);
            console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
        }
    }

    useEffect(() => {
        resetArray
        mergeSort
    }, [array])


    return (
        <>
            <div className="title">
                <h2><strong>Sorting</strong> Visualizer</h2>
            </div>

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
                    <button onClick={() => resetArray()}>Reset</button>
                    <button onClick={() => mergeSort(array)}>Sort</button>
                    {/* <button onClick={() => testSortingAlgorithms()}>Test</button> */}
                </div>

            </div>
        </>
    )
}

export default SortingVisualizer