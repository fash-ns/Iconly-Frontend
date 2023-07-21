import type {FunctionComponent} from "react";
import styles from "../css/root.module.css";
import Progress from "../../ui/components/Progress";
import axios from "axios";
import Button from "../../ui/components/Button";
import type {IconEntity} from "../types/IconEntity";
import IconCard from "./IconCard";

export interface IconListPropsType {
    selectedIds: number[];
    renderableData: IconEntity[];
    isIdSelected: (id: number) => boolean;
    handleSelect: (id: number) => void;
    unselectAll: () => void;
    loading: boolean;
    finished: boolean;

}

const IconList: FunctionComponent<IconListPropsType> = (props) => (
    <div>
        <div className="container xl" style={{marginBottom: props.selectedIds.length > 0 ? 75 : 0}}>
            <h1 className={styles.title}>Icons list</h1>
            <div className={styles.gridContainer}>
                {props.renderableData.map((item) => (
                    <div className={styles.gridItem} key={item.id}>
                        <IconCard selected={false} onClick={() => props.handleSelect(item.id)}
                                  image={item.file_path} name={item.name}/>
                    </div>
                ))}
            </div>
            <div className={styles.infiniteScroll}>
                {props.loading && <Progress size={40}/>}
                {props.finished && <span className={styles.secondaryText}>Reached the end</span>}
            </div>
        </div>
        {props.selectedIds.length > 0 && (
            <div className={styles.downloadSection}>
                <div>
                    <a href={`${axios.defaults.baseURL as string}/icons/download?ids=${props.selectedIds.join(',')}`}>
                        <Button style={{width: 300, marginRight: 5}}>
                            Download {props.selectedIds.length} item(s)
                        </Button>
                    </a>
                    <Button error onClick={props.unselectAll}>Unselect all</Button>
                </div>
            </div>
        )}
    </div>
)

export default IconList;