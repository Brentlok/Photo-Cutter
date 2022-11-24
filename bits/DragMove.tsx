import { PropsWithChildren, useState, PointerEvent } from "react"

type Event = PointerEvent<HTMLDivElement>;

type Props = PropsWithChildren<{
    onDragMove: (e: Event) => void;
}>;

export const DragMove = (props: Props) => {
    const [isDragging, setIsDragging] = useState(false);

    const handlePointerMove = (e: Event) => {
        if (!isDragging) {
            return;
        }

        props.onDragMove(e);
    };

    return (
        <div
            onPointerDown={() => setIsDragging(true)}
            onPointerUp={() => setIsDragging(false)}
            onPointerMove={handlePointerMove}
        >
            {props.children}
        </div>

    )
}