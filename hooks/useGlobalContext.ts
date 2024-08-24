import { GlobalValue, GlobalValueContext } from "@/context/GlobalValueProvider";
import { useContext } from "react";

export default function useGlobalContext(): GlobalValue {

    const globalContextValue = useContext(GlobalValueContext);

    if (globalContextValue === null) {
        throw new Error(
            "Wrap the root component using GlobalContextProvider"
        );
    }

    return globalContextValue;
}