"use client"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const createProductAction = async (formData: FormData) => {
    const name = formData.get("name") as string;
    console.log(name)
}

function CreateProductPage() {
    return (
        <section>
            <h1 className="text-2xl font-semibold mb-8 capitalize">Create Product</h1>
            <div className="border p-8 rounded-md">
                <form action={createProductAction}>
                    <div className="mb-2">
                        <Label className="mb-4" htmlFor="name">Product Name</Label>
                        <Input className="mb-4" id="id" name="name" type="text" />
                    </div>
                    <Button size="lg" type="submit">Submit</Button>
                </form>
            </div>
        </section>
    )
}
export default CreateProductPage;