import {Controller, ControllerRenderProps, FieldPath, UseFormReturn} from "react-hook-form";
import {Field, FieldDescription, FieldError, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"
import {Book} from "@/lib/api/booktype";

// Properties for a FormController!
export interface ControllerProps {
    name : FieldPath<Book>,
    type : string,
    label : string,
    placeholder? : string,
    desc : string,
    value? : string,
    stepSize? : number,
    form : UseFormReturn<Book, Book>,
}

/* GenerateInputTag:
    Component to create a certain type of form input.
    Determines which one to use based on the "type" string!
 */
function GenerateInputTag(props : ControllerProps,
                          field :  ControllerRenderProps<Book, "itemId" | "bookTitle" | "isAvailable" | "isbn" | "pageCount" | "lateFeeUsd">  // Weird type just for this to work :(
    ) {
    switch (props.type) {
        case "text":
            return (
                <Input
                    {...field}
                    id={field.name}
                    type="text"
                    placeholder={props.placeholder}
                    value={typeof field.value === "string" || typeof field.value === "number" ? field.value : ""}
                    // ^ credit to Perplexity AI for helping fix an error with this value property!
                    // https://www.perplexity.ai/search/i-m-not-understanding-value-fi-FBYoEbzDSA.xBFtRPuTu0w
                />
            );
        case "checkbox":
            return (
                <Checkbox
                    {...field}
                    id={field.name}
                    value={typeof field.value === "string" || typeof field.value === "number" ? field.value : ""} // Also had to put this here as well
                    checked={field.value === true} // This had to be this way to work!
                    onCheckedChange={field.onChange}
                />
            );
        case "number":
            return (
                <Input
                    {...field}
                    id={field.name}
                    type="number"
                    value={typeof field.value === "string" || typeof field.value === "number" ? field.value : ""} // And here to prevent errors
                    step={props.stepSize}
                    placeholder="200"
                />
            );
    }
    return <></> // Return an empty tag for unexpected cases!!!
}

/* FormController:
    A component I made to make Controllers to make inputs inside
    forms easier to make! Takes special properties to make a new
    Controller component.
 */
export function FormController(props : ControllerProps) {
    return (
        <Controller
            name={props.name}
            control={props.form.control}
            rules={{ required: true }}
            render={( {field, fieldState} ) => (
                <Field>
                    <FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
                    {GenerateInputTag(props, field) }
                    <FieldDescription>
                        {props.desc}
                    </FieldDescription>
                    { // Conditionally render an error!
                        fieldState.invalid && <FieldError errors={ [fieldState.error] }/>
                    }
                </Field>
            )}
        />
    )
}