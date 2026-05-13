import {PageContainer} from "@/components/page-container";
import {LoaderIcon} from "lucide-react";

// Simple tag to represent the loading screen
// (inspired by City Data Client example, but with different styling)
export function Loading() {
    return (
        <PageContainer>
            <LoaderIcon className="size-48"/>
            <h3 className="text-indigo-700 text-5xl">Loading Books...</h3>
        </PageContainer>
    )
}