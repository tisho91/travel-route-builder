import {useCallback} from "react";

export const useHandleDragAndDropCountry = () => {

    const onDragStart = useCallback((event: React.DragEvent, country: any) => {
        console.log('event here',country.name);
        event.dataTransfer.setData("country", JSON.stringify(country));
        event.dataTransfer.effectAllowed = "move";

    }, []);


    return {
        onDragStart,
    }
}