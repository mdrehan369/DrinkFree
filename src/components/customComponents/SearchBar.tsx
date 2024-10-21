import { Input } from "../ui/input"

type Props = {
    value: string,
    setValue: any
}

export const SearchBar = (props: Props) => {
     return (
        <Input
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
            className="w-[80%] h-[7vh] border-[1px] border-gray-500 shadow-sm"
            placeholder="Search here..."
        />
     )
}