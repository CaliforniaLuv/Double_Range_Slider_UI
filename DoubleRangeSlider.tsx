import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

interface MultipleRangeInputProps {
  rangeInfoList: string[];
}

export const MultipleRangeInput = ({
  rangeInfoList,
}: MultipleRangeInputProps) => {
  const RANGE_MAX = rangeInfoList.length;
  const RANGE_MIN = 0;
  const STEP = 1;
  const INTERVAL = 7.5;

  const [range, setRange] = useState({
    left: RANGE_MIN,
    right: RANGE_MAX,
  });

  const sliderTrack = useRef<HTMLDivElement>(null);
  const priceInfoBox = useRef<HTMLDivElement>(null);

  const handleLeft = (e: ChangeEvent<HTMLInputElement>) => {
    const currentRange = Number(e.target.value);
    if (currentRange >= range.right) {
      return currentRange === RANGE_MAX && range.right === RANGE_MAX
        ? setRange({
            ...range,
            left: currentRange,
          })
        : null;
    }
    return setRange({
      ...range,
      left: currentRange,
    });
  };

  const handleRight = (e: ChangeEvent<HTMLInputElement>) => {
    const currentRange = Number(e.target.value);
    if (currentRange <= range.left) {
      return currentRange === RANGE_MIN && range.left === RANGE_MIN
        ? setRange({
            ...range,
            right: currentRange,
          })
        : null;
    }
    return setRange({
      ...range,
      right: currentRange,
    });
  };

  const trackEffect = useCallback(
    (right: number, left: number, max: number) => {
      const conversionNumber = 100 / max;

      if (sliderTrack.current) {
        sliderTrack.current.style.background = `linear-gradient(to right, #DFDFDF ${
          left * conversionNumber
        }%, #37A403 ${left * conversionNumber}%, 
        #37A403 ${right * conversionNumber}%, #DFDFDF ${
          right * conversionNumber
        }%)`;
      }
    },
    []
  );
  useEffect(() => {
    if (range.left <= range.right) {
      trackEffect(range.right, range.left, RANGE_MAX);
    }
  }, [range, trackEffect, RANGE_MAX]);

  useEffect(() => {
    if (priceInfoBox.current) {
      priceInfoBox.current.style.left = String(range.right * INTERVAL) + "%";
    }
  }, [range]);

  return (
    <div className="w-full flex items-center gap-x-[18px]">
      <span className="text-gray-80 regular-12">80원 미만 / kWh</span>
      <div
        ref={sliderTrack}
        className="w-[304px] h-[7px] bg-gray-30 relative rounded-[10px]"
      >
        <input
          type="range"
          min={RANGE_MIN}
          max={RANGE_MAX}
          id="Multiple-left"
          step={STEP}
          className={`block appearance-none w-full outline-none absolute m-auto top-0 bottom-0 bg-transparent pointer-events-none z-10 ${
            range.left === RANGE_MAX && range.left === range.right && "z-20"
          }
          [&::-webkit-slider-thumb]:bg-green-100 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[16px] [&::-webkit-slider-thumb]:w-[16px] [&::-webkit-slider-thumb]:cursor-grab
          [&::-webkit-slider-thumb]:rounded-[10px] [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:z-10 [&::-webkit-slider-thumb]:touch-pan-x
          [&:active::-webkit-slider-thumb]:shadow-[0px_0px_0px_4px_#b4daa2] [&:active::-webkit-slider-thumb]:transition-all`}
          value={range.left}
          onChange={(e) => handleLeft(e)}
        />
        <div>
          <input
            type="range"
            min={RANGE_MIN}
            max={RANGE_MAX}
            step={STEP}
            id="Multiple-right"
            className="block appearance-none w-full outline-none absolute m-auto top-0 bottom-0 bg-transparent pointer-events-none z-10
          [&::-webkit-slider-thumb]:bg-green-100 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[16px] [&::-webkit-slider-thumb]:w-[16px] [&::-webkit-slider-thumb]:cursor-grab
          [&::-webkit-slider-thumb]:rounded-[10px] [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:z-10 [&::-webkit-slider-thumb]:touch-pan-x
          [&:active::-webkit-slider-thumb]:shadow-[0px_0px_0px_4px_#b4daa2] [&:active::-webkit-slider-thumb]:transition-all  
          "
            value={range.right}
            onChange={(e) => handleRight(e)}
          />
          <div
            ref={priceInfoBox}
            className="flex flex-col items-center absolute top-[30px] bg-green-10  px-[16px] py-[12px] rounded-[5px]"
          >
            <span className="regular-12">구매단가</span>
            <p className="semiBold-14 whitespace-nowrap">
              {convertRangeUnits(
                range.left,
                range.right,
                RANGE_MIN,
                RANGE_MAX,
                rangeInfoList
              )}
            </p>
          </div>
        </div>
      </div>
      <span className="text-gray-80 regular-12">170원 이상 / kWh</span>
    </div>
  );
};

const convertRangeUnits = (
  left: number,
  right: number,
  min: number,
  max: number,
  rangeInfo: Record<number, string>
) => {
  if (left <= min && right <= min) {
    return rangeInfo[min] + " 미만" + " / kWh";
  } else if (left >= max && right >= max) {
    return rangeInfo[max - 1] + " 이상" + " / kWh";
  } else if (left < right) {
    return (
      rangeInfo[left] +
      " 이상" +
      " ~ " +
      rangeInfo[right - 1] +
      " 미만" +
      " / kWh"
    );
  }

  return (
    rangeInfo[right] + " 이상" + " ~ " + rangeInfo[left] + " 미만" + " / kWh"
  );
};
