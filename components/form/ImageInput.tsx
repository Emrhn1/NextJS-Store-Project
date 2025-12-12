import { Label } from '../ui/label';
import { Input } from '../ui/input';

function ImageInput() {
    const name = 'image'
    return (
        <div className="mb-2">
            <Label htmlFor={name} className="capitalize">
                Image
            </Label>
            <Input id={name} type="file" required accept="image/*" name={name} className="mb-2" />
        </div>
    )
}
export default ImageInput;