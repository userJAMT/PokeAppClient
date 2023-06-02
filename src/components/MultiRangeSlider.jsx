import { useCallback, useEffect, useRef, useState } from 'react'
import './MultiRangeSlider.css'

export const MultiRangeSlider = ({ min, max, id, onChange }) => {
  const [minVal, setMinValue] = useState(min)
  const [maxVal, setMaxValue] = useState(max)
  const minValRef = useRef(null)
  const maxValRef = useRef(null)
  const range = useRef(null)

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100), [min, max]
  )

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal)
      const maxPercent = getPercent(+maxValRef.current.value)

      if (range.current) {
        range.current.style.left = `${minPercent}%`
        range.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [minVal, getPercent])

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value)
      const maxPercent = getPercent(maxVal)

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [maxVal, getPercent])

  useEffect(() => {
    onChange({ min: minVal, max: maxVal, id })
  }, [minVal, maxVal])

  return (
    <>
      <input
        className='thumb'
        style={minVal > max - 100 ? { zIndex: 5 } : { zIndex: 3 }}
        type='range'
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 1)
          setMinValue(value)
          event.target.value = value.toString()
        }}
      />
      <input
        className='thumb'
        style={{ zIndex: 4 }}
        type='range'
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 1)
          setMaxValue(value)
          event.target.value = value.toString()
        }}
      />
      <div className='slider'>
        <div className='slider__track' />
        <div className='slider__range' ref={range} />
        <div className='slider__left-value'>{minVal}</div>
        <div className='slider__right-value'>{maxVal}</div>
      </div>
    </>
  )
}
