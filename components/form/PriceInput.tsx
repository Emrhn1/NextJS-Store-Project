import { Label } from '../ui/label';
import { Input } from '../ui/input';

const name = 'price';
type FormInputPropsNumber = {
    defaultValue?: number;
}

function PriceInput({defaultValue}: FormInputPropsNumber) {
    return (
        <div className="mb-2">
            <Label className="capitalize" htmlFor={name}>Price ($)</Label>
            <Input type="text" id={name} defaultValue={defaultValue || 100} min={0} required />
        </div>
    )
}
export default PriceInput