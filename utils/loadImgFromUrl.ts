export const loadImgFromUrl = (url: string) => new Promise<HTMLImageElement>((res, rej) => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
        res(img);
    };

    img.onerror = () => {
        rej(new Error("Image error"));
    }
});