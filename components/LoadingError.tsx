import {PageContainer} from "@/components/page-container";
import {TriangleAlertIcon} from "lucide-react";

// Literally the same as the example one (not too complex/nothing really to change)
type ErrorProps = {
    msg: string;
}

// Custom loadingError page, I added a triangle alert icon!
export function LoadingError({msg}: ErrorProps) {
    return (
    <PageContainer>
        <TriangleAlertIcon className="size-48"/>
        <span className="text-red-500 text-4xl italic">Error: {msg}</span>
    </PageContainer>
)
}