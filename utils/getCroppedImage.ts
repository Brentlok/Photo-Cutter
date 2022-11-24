import { Coordinates } from "~/types";
import { loadImgFromUrl } from "./loadImgFromUrl";

export const getCroppedImage = async (
    path: string,
    width: number,
    height: number,
    scaleData: number,
    coordinates: Coordinates
): Promise<string> => {
    const image = await loadImgFromUrl(path);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const scale = (100 + scaleData) / 100;

    if (!ctx) {
        return '';
    }

    ctx.translate(coordinates.x, coordinates.y);
    ctx.translate(width / 2 * -scaleData / 100, height / 2 * -scaleData / 100);
    ctx.scale(scale, scale);

    ctx.drawImage(
        image,
        0,
        0,
        width,
        height,
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            if (!blob) {
                reject(new Error("Canvas is empty"));
                return '';
            }

            resolve(URL.createObjectURL(blob));
        }, "image/png");
    });
}