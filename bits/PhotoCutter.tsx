import Image from "next/image"
import { PointerEvent, Dispatch, SetStateAction, useRef, useEffect, useState } from "react";
import { Coordinates } from "~/types";
import { DragMove } from "./DragMove";

type Props = {
    coordinates: Coordinates;
    setCoordinates: Dispatch<SetStateAction<Coordinates>>;
    zoom: number;
    img: string;
    onImgLoad: () => void;
}

export const PhotoCutter = (props: Props) => {
    const { coordinates, setCoordinates, zoom } = props;
    const scaleRef = useRef<HTMLDivElement>(null);
    const [setIsDragging, setRef] = useState<Dispatch<SetStateAction<boolean>>>();

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
            setIsDragging?.(false);
            return;
        }

        setCoordinates(newCoordinates);
    };

    return (
        <div className="w-80 h-80 relative overflow-hidden cutter">
            <DragMove onDragMove={handleDragMove}>
                <div className="w-80 h-80 bg-orange-50 rounded-full absolute top-0 left-0"></div>
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
                            src={props.img}
                            alt=''
                            fill={true}
                            className='image'
                            onLoadingComplete={props.onImgLoad}
                        />
                    </div>
                </div>
            </DragMove>
        </div>
    )
}