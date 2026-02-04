interface Props {
    snippets: React.ReactNode[];
}
const Grid = ({ snippets }: Props) => {
    return (
        <>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
                {snippets.map((snippet, i) => (
                    <div key={i} className="col">
                        {snippet}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Grid;
