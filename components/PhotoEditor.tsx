import { ChangeEvent, useRef, useState } from "react";
import { Button, InputRange, PhotoCutter } from "~/bits";
import { Coordinates } from "~/types";
import { getCroppedImage } from "~/utils";

export const PhotoEditor = () => {
    const [img, setImg] = useState('/assets/mock.png');
    const [zoom, setZoom] = useState(0);
    const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
    const fileRef = useRef<HTMLInputElement>(null);

    const clear = () => {
        setCoordinates({ x: 0, y: 0 });
        setZoom(0);
    }

    const save = async () => {
        const url = await getCroppedImage(img, 320, 320, zoom, coordinates);
        setImg(url);
    }

    const simulateFileUpload = () => {
        if (!fileRef.current) {
            return;
        }

        fileRef.current.click();
    }

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0);

        if (!file) {
            return;
        }

        setImg(URL.createObjectURL(file));
        clear();
    }

    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl shadow-xl rounded-xl p-6">
            <h1 className="text-xl font-bold">Profile photo</h1>
            <h2 className="text-sm">Add or change the current profile photo</h2>
            <input
                type='file'
                ref={fileRef}
                hidden={true}
                accept='image/*'
                onChange={handleFileUpload}
            />
            <Button
                action={simulateFileUpload}
                text="Add photo"
                type="primary"
            />
            <PhotoCutter
                img={img}
                zoom={zoom}
                coordinates={coordinates}
                setCoordinates={setCoordinates}
                onImgLoad={clear}
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
                    action={clear}
                    text="Cancel"
                    type="primary"
                />
                <Button
                    action={save}
                    text="Save changes"
                    type="secondary"
                />
            </div>
        </div>
    );
}