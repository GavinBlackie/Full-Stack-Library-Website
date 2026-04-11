import {Controller, FieldPath, UseFormReturn} from "react-hook-form";
import {Field, FieldDescription, FieldError, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Book} from "@/lib/api/booktype";

// Properties for a FormController!
export interface ControllerProps {
    name : FieldPath<Book>,
    type : string,
    placeholder: string,
    desc : string,
    value?: string,
    form : UseFormReturn<Book, Book>
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
            render={( {field, fieldState} ) => (
                <Field>
                    <FieldLabel htmlFor={field.name}></FieldLabel>
                    <Input
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder={props.placeholder}
                        value={typeof field.value === "string" || typeof field.value === "number" ? field.value : ""}
                        // ^ credit to Perplexity AI for helping fix an error with this value property!
                        // https://www.perplexity.ai/search/i-m-not-understanding-value-fi-FBYoEbzDSA.xBFtRPuTu0w
                    />
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