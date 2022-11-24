import Image from "next/image"
import { PointerEvent, Dispatch, SetStateAction, useRef, useEffect } from "react";
import { Coordinates } from "~/types";
import { DragMove } from "./DragMove";

type Props = {
    coordinates: Coordinates;
    setCoordinates: Dispatch<SetStateAction<Coordinates>>;
    zoom: number;
}

export const PhotoCutter = (props: Props) => {
    const { coordinates, setCoordinates, zoom } = props;
    const scaleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scaleRef.current) {
            return;
        }

        const scale = (100 + zoom) / 100;
        scaleRef.current.setAttribute('style', `--tw-scale-x: ${scale}; --tw-scale-y: ${scale};`);

    }, [zoom, scaleRef]);

    const handleDragMove = (e: PointerEvent<HTMLDivElement>) => {
        const newCoordinates = {
            x: coordinates.x + e.movementX,
            y: coordinates.y + e.movementY
        };

        if (
            newCoordinates.x <= -320 ||
            newCoordinates.x >= 320 ||
            newCoordinates.y <= -320 ||
            newCoordinates.y >= 320
        ) {
            return;
        }

        setCoordinates(newCoordinates);
    };

    return (
        <div className="w-80 h-80 relative overflow-hidden cutter">
            <DragMove
                onDragMove={handleDragMove}
            >
                <div
                    className="w-80 h-80"
                    style={{
                        transform: `translateX(${coordinates.x}px) translateY(${coordinates.y}px)`
                    }}
                >
                    <div
                        className="w-80 h-80 relative scale"
                        ref={scaleRef}
                    >
                        <Image
                            src='/assets/mock.png'
                            alt=''
                            fill={true}
                            className='image'
                        />
                    </div>
                </div>
            </DragMove>
        </div>
    )
}