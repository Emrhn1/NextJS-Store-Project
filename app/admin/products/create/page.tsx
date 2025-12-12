"use client"
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/FormInput";
import {type} from "node:os";
import FormContainer from "@/components/form/FormContainer";
import {createProductAction} from "@/utils/actions";
import PriceInput from "@/components/form/PriceInput";
import ImageInput from "@/components/form/ImageInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import CheckboxInput from "@/components/form/CheckBoxInput";
import Buttons from "@/components/form/Buttons";

function CreateProductPage() {
    return (
        <section>
            <h1 className="text-2xl font-semibold mb-8 capitalize">Create Product</h1>
            <div className="border p-8 rounded-md">
                <FormContainer action={createProductAction}>
                         <div className="grid gap-4 md:grid-cols-2 my-4">
                            <FormInput name="name" type="text"
                            label="Product Name"
                            />
                             <FormInput name="company" type="text" label="company" defaultValue="company"/>
                             <PriceInput/>
                             <ImageInput/>
                         </div>
                      <TextAreaInput name="description" labelText="Product Description" defaultValue="Product Description"/>
                    <div className="mt-6">
                        <CheckboxInput name="featured" label="featured"/>
                    </div>
                    <Buttons className="mt-4" text="Create Product" />
                </FormContainer>
            </div>
        </section>
    )
}
export default CreateProductPage;