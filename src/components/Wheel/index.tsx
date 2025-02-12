import { useEffect, useRef, useState } from "react";
import { WheelProps } from "./types";
import { config, useSpring, animated } from "react-spring";
import { getRandomArbitrary } from "../../utils";

const clamp = (val: number, min: number, max: number): number => {
  return val > max ? max : val < min ? min : val;
};

export const Wheel: React.FC<WheelProps> = ({
  height,
  width,
  changePointsRef,
  hide,
}) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [markerRotation, setMarkerRotation] = useState(0);
  const [pointsStyles, apiPointsStyles] = useSpring(() => ({
    from: {
      rotate: 0,
      width,
      height,
    },
    config: config.stiff,
  }));

  const [hiderStyles, apiHiderStyles] = useSpring(() => ({
    from: {
      rotate: 0,
      width,
      height,
    },
    config: config.wobbly,
  }));

  useEffect(() => {
    if (hide) {
      apiHiderStyles({
        to: {
          rotate: 180,
        },
      });
    } else {
      apiHiderStyles({
        to: {
          rotate: 0,
        },
      });
    }
  }, [apiHiderStyles, hide]);

  useEffect(() => {
    changePointsRef.current = () => {
      apiPointsStyles({
        to: {
          rotate: getRandomArbitrary(-82, 82),
        },
      });
    };
  }, [apiHiderStyles, apiPointsStyles, changePointsRef]);

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setDragImage(new Image(), 0, 0);
  };
  const onDrag = (event: React.DragEvent<HTMLDivElement>) => {
    if (wheelRef.current && (event.clientY !== 0 || event.clientX !== 0)) {
      const wheelCenterX =
        wheelRef.current.offsetLeft + wheelRef.current.clientWidth / 2;
      const wheelCenterY =
        wheelRef.current.offsetTop + wheelRef.current.clientHeight / 2;

      const angle =
        (Math.atan2(
          wheelCenterY - event.clientY,
          wheelCenterX - event.clientX
        ) -
          Math.PI / 2) *
        (180 / Math.PI);

      setMarkerRotation(clamp(angle, -82, 82));
    }
  };

  return (
    <div
      ref={wheelRef}
      style={{
        width,
        height,
      }}
      className="bg-sky-100	 rounded-full relative overflow-hidden grid abso"
    >
      <animated.div className="absolute" style={pointsStyles}>
        <svg
          height={height}
          width={width}
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
        >
          <polygon
            points={`${width / 2 - (width * 0.06) / 2},${0} ${width / 2},${
              height / 2
            } ${width / 2 + (width * 0.06) / 2},${0}`}
            className="fill-sky-400"
          />
        </svg>
        <svg
          height={height}
          width={width}
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
          style={{
            transform: `rotate(6.5deg)`,
          }}
        >
          <polygon
            points={`${width / 2 - (width * 0.06) / 2},${0} ${width / 2},${
              height / 2
            } ${width / 2 + (width * 0.06) / 2},${0}`}
            className="fill-orange-500	"
          />
        </svg>
        <svg
          height={height}
          width={width}
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
          style={{
            transform: `rotate(-6.5deg)`,
          }}
        >
          <polygon
            points={`${width / 2 - (width * 0.06) / 2},${0} ${width / 2},${
              height / 2
            } ${width / 2 + (width * 0.06) / 2},${0}`}
            className="fill-orange-500"
          />
        </svg>
        <svg
          height={height}
          width={width}
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
          style={{
            transform: `rotate(-13deg)`,
          }}
        >
          <polygon
            points={`${width / 2 - (width * 0.06) / 2},${0} ${width / 2},${
              height / 2
            } ${width / 2 + (width * 0.06) / 2},${0}`}
            className="fill-yellow-400"
          />
        </svg>
        <svg
          height={height}
          width={width}
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
          style={{
            transform: `rotate(13deg)`,
          }}
        >
          <polygon
            points={`${width / 2 - (width * 0.06) / 2},${0} ${width / 2},${
              height / 2
            } ${width / 2 + (width * 0.06) / 2},${0}`}
            className="fill-yellow-400"
          />
        </svg>
      </animated.div>
      <animated.div style={hiderStyles}>
        <div className="w-full h-1/2 bg-violet-500 absolute bottom-0"></div>
        <div className="w-1/2 h-1/2 bg-violet-500 absolute bottom-0 left-0 rotate-6 origin-top-right"></div>
        <div className="w-1/2 h-1/2 bg-violet-500 absolute bottom-0 right-0 -rotate-6 origin-top-left"></div>
      </animated.div>
      <div>
        <div className="w-full h-1/2 bg-cyan-900 absolute bottom-0"></div>
        <div className="w-1/2 h-1/2 bg-cyan-900 absolute bottom-0 left-0 rotate-6 origin-top-right"></div>
        <div className="w-1/2 h-1/2 bg-cyan-900 absolute bottom-0 right-0 -rotate-6 origin-top-left"></div>
      </div>
      <div
        className="w-full h-full absolute"
        style={{
          transform: `rotate(${markerRotation}deg)`,
          width,
          height,
        }}
      >
        <div
          draggable="true"
          onDragStart={onDragStart}
          onDrag={onDrag}
          className="cursor-grab w-[1.5%] h-1/2 bg-red-700 absolute left-1/2 top-0 rounded-full origin-bottom -translate-x-1/2"
        ></div>
        <div
          draggable="true"
          onDragStart={onDragStart}
          onDrag={onDrag}
          className="cursor-grab w-1/5 h-1/5 bg-red-700 absolute left-1/2 top-1/2 rounded-full -translate-y-1/2 -translate-x-1/2"
        ></div>
      </div>
    </div>
  );
};
