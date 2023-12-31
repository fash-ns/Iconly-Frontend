import {useCallback, useEffect, useMemo, useState} from "react";
import getLocalStorageJson from "../modules/shared/utils/getLocalStorageJson";
import useInfiniteScroll from "../modules/shared/hooks/useInfiniteScroll";
import axios from "axios";
import type {LaravelPagination} from "../modules/shared/types/LaravelPagination";
import type {IconEntity} from "../modules/icons/types/IconEntity";
import IconList from "../modules/icons/component/IconList";

export default function Icons() {
    const [selectedIds, setSelectedIds] = useState<number[]>(getLocalStorageJson("selectedIds", []) as number[]);
    // Memorizes initial user selected ids. So changes in user selected icons will not affect other pages data.
    const excludedIds = useMemo(() => selectedIds.join(','), []);
    const [selectedIcons, setSelectedIcons] = useState<IconEntity[]>([]);

    // Usage of useInfiniteScroll
    const {loading, finished, data, fetch} = useInfiniteScroll<LaravelPagination<IconEntity>>(async ({lastData, setFinished}, conf = {}) => {
        const page = lastData ? lastData.meta.current_page + 1 : 1;
        const icons = await axios.get<LaravelPagination<IconEntity>>(`/icons/list?page=${page}&exclude_ids=${excludedIds}`, conf);
        if(icons.data.meta.last_page === icons.data.meta.current_page) setFinished(true);
        return icons.data;
    });

    useEffect(() => {
        /*
         * Added abortController to cancel the second request is sent in development
         * environment (because of react strict mode)
         */
        const controller = new AbortController()
        fetch({signal: controller.signal});
        axios.get<LaravelPagination<IconEntity>>(`/icons/list/selected?ids=${selectedIds.join(',')}`)
            .then(res => setSelectedIcons(res.data.data)).catch(console.error);
        return () => controller.abort();
    }, [])

    // Memorized data in order not to create the data object on each re-render.
    const renderableData: IconEntity[] = useMemo(() => {
        const finalData = [...selectedIcons];
        data.forEach(item => finalData.push(...item.data));
        return finalData;
    }, [selectedIcons, data])

    /***
     * Checks if provided id is in selectedIds. Memorized function definition in order not to define the function on
     * each re-render.
     * @param id
     */
    const isIdSelected = useCallback((id: number) => {
        return selectedIds.includes(id)
    }, [selectedIds])

    /***
     * Adds provided id to selectedIds state and localstorage in order to make the ids persisted during refreshes.
     * Memorized function definition in order not to define the function on each re-render
     * @param id
     */
    const handleSelect = useCallback((id: number) => {
        setSelectedIds(prev => {
            let updated;
            if (isIdSelected(id)) updated = prev.filter(item => item !== id);
            else updated = [...prev, id];
            localStorage.setItem("selectedIds", JSON.stringify(updated));
            return updated;
        });
    }, [isIdSelected]);

    /***
     * Memorized function in order to create it once as the function doesn't depend on any states.
     */
    const unselectAll = useCallback(() => {
        setSelectedIds([]);
        localStorage.setItem("selectedIds", '[]');
    }, [])

    return (<IconList selectedIds={selectedIds} renderableData={renderableData} isIdSelected={isIdSelected}
                      handleSelect={handleSelect} unselectAll={unselectAll} loading={loading} finished={finished}/>)
}