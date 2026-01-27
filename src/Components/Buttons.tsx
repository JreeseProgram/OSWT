interface Props {
    text: string;
    color?:
        | "primary"
        | "secondary"
        | "success"
        | "danger"
        | "warning"
        | "info"
        | "light"
        | "dark"
        | "link";
    onClick: () => void;
}

const Buttons = ({ text, color, onClick }: Props) => {
    return (
        <button type="button" className={"btn btn-" + color} onClick={onClick}>
            {text}
        </button>
    );
};

export default Buttons;
