import { useState } from "react";
import { Button, InputRange, PhotoCutter } from "~/bits";
import { Coordinates } from "~/types";

export const PhotoEditor = () => {
    const [zoom, setZoom] = useState(0);
    const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });

    const clearCoordinates = () => {
        setCoordinates({ x: 0, y: 0 });
        setZoom(0);
    }

    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl shadow-xl rounded-xl p-6">
            <h1 className="text-xl font-bold">Profile photo</h1>
            <h2 className="text-sm">Add or change the current profile photo</h2>
            <Button
                action={() => { }}
                text="Add photo"
                type="primary"
            />
            <PhotoCutter
                zoom={zoom}
                coordinates={coordinates}
                setCoordinates={setCoordinates}
            />
            <InputRange
                value={zoom}
                setValue={setZoom}
                min={0}
                max={100}
                step={10}
            />
            <div className="w-full flex justify-center gap-4">
                <Button
                    action={clearCoordinates}
                    text="Cancel"
                    type="primary"
                />
                <Button
                    action={() => { }}
                    text="Save changes"
                    type="secondary"
                />
            </div>
        </div>
    );
}