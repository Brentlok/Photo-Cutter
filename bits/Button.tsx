type Props = {
    action: () => void;
    text: string;
    type: 'primary' | 'secondary';
}

export const Button = (props: Props) => {
    return (
        <button
            className="button border-1 py-3 px-5 rounded-xl text-sm hover:shadow-md transition-shadow font-semibold"
            onClick={props.action}
            data-type={props.type}
        >
            {props.text}
        </button>
    );
}