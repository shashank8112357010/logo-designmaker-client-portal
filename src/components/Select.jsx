import { useRef, useState, useEffect } from "react";
import { XCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const Select = ({ options, value, onChange }) => {
    const [query, setQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const inputRef = useRef(null);

    const filteredTags = options.filter(
        (item) =>
            item?.toLocaleLowerCase()?.includes(query.toLocaleLowerCase()?.trim()) &&
            !value.includes(item)
    );

    const isDisable =
        !query?.trim() ||
        value.some(
            (item) =>
                item?.toLocaleLowerCase()?.trim() === query?.toLocaleLowerCase()?.trim()
        );

    const handleRemove = (tag) => {
        const newSelected = value.filter((i) => i !== tag);
        onChange(newSelected);
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.width = `${inputRef.current.value.length + 1}ch`;
        }
    }, [query]);

    const handleBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setMenuOpen(false);
        }
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <div className="w-full grid place-items-center">
            <div className="relative w-full text-sm text-white" onBlur={handleBlur} tabIndex="0">
                <div className="card flex items-center justify-between p-3 w-full gap-2.5">
                    <div className="flex flex-wrap flex-1 items-center gap-1 z-10">
                        {value.map((tag) => (
                            <div
                                key={tag}
                                className="rounded-full py-1.5 px-3 border border-gray-400 bg-gray-50 text-gray-500 flex items-center gap-2"
                            >
                                {tag}
                                <div
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => handleRemove(tag)}
                                >
                                    <XCircleIcon className="w-4 h-4 cursor-pointer" />
                                </div>
                            </div>
                        ))}
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={
                                value.length === 0 && query === ""
                                    ? "Please add your requirements"
                                    : ""
                            }
                            className="bg-transparent text-[16px] flex-1 text-white"
                            onClick={toggleMenu}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !isDisable) {
                                    const newSelected = [...value, query];
                                    onChange(newSelected);
                                    setQuery("");
                                }
                            }}
                            style={{ minWidth: "50px", color: "white", height: "30px" }}
                        />
                        <ChevronDownIcon
                            className="w-5 h-5 text-gray-500 cursor-pointer"
                            onClick={toggleMenu}
                        />
                    </div>
                </div>

                {menuOpen && filteredTags.length > 0 && (
                    <div className="card absolute w-full max-h-52 mt-2 p-1 flex overflow-y-auto custom-scrollbar z-20">
                        <ul className="w-full">
                            {filteredTags.map((tag) => (
                                <li
                                    key={tag}
                                    className="p-2 cursor-pointer hover:bg-primaryGrey text-white rounded-md w-full"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => {
                                        const newSelected = [...value, tag];
                                        onChange(newSelected);
                                        setQuery("");
                                    }}
                                >
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Select;
