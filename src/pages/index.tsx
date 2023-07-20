import {useEffect, useMemo, useState} from "react";
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

    const renderableData: IconEntity[] = [...selectedIcons];
    data.forEach(item => renderableData.push(...item.data));

    /***
     * Checks if provided id is in selectedIds.
     * @param id
     */
    function isIdSelected(id: number) {
        return selectedIds.includes(id)
    }

    /***
     * Adds provided id to selectedIds state and localstorage in order to make the ids persisted during refreshes.
     * @param id
     */
    function handleSelect(id: number) {
        setSelectedIds(prev => {
            let updated;
            if (isIdSelected(id)) updated = prev.filter(item => item !== id);
            else updated = [...prev, id];
            localStorage.setItem("selectedIds", JSON.stringify(updated));
            return updated;
        });
    }

    function unselectAll() {
        setSelectedIds([]);
        localStorage.setItem("selectedIds", '[]');
    }

    return (<IconList selectedIds={selectedIds} renderableData={renderableData} isIdSelected={isIdSelected}
                      handleSelect={handleSelect} unselectAll={unselectAll} loading={loading} finished={finished}/>)
}