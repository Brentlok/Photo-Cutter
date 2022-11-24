import { Dispatch, SetStateAction } from "react";

type Props = {
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
    min: number;
    max: number;
    step: number;
}

export const InputRange = (props: Props) => {
    const handleChange = (direction: -1 | 1) => () => {
        props.setValue(props.value + (direction * props.step));
    }

    return (
        <div className="flex gap-2 items-center">
            <span
                className="minus"
                onClick={handleChange(-1)}
            />
            <div className="relative flex items-center">
                <label htmlFor="range" className="w-full bg-gray-300 h-1 absolute rounded-full" />
                <input
                    type="range"
                    value={props.value}
                    min={props.min}
                    max={props.max}
                    onChange={e => props.setValue(Number(e.target.value))}
                    id="range"
                    className="appearance-none w-full h-6 p-0 bg-transparent z-10 relative range"
                />
            </div>
            <span
                className="plus"
                onClick={handleChange(1)}
            />
        </div>
    );
}