import {Separator} from "@/components/ui/separator";

const SectionTitle = ({text}: {text:string}) => {
    return (
        <div>
            <h2 className="text-4xl font-medium capitalize mb-7">
                {text}
            </h2>
            <Separator/>
        </div>
    )
}
export default SectionTitle