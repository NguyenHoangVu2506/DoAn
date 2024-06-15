import { useEffect } from "react";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilDelete, cilPencil } from "@coreui/icons";
import { useDispatch, useSelector } from "react-redux";
import { ListTrashTopic1, RemoveTopic, TopicRestore } from "../../../store/actions";
function ListTrashTopic() {
    const dispatch = useDispatch();
    const { listDelTopic } = useSelector((state) => state.topicReducer);

    useEffect(() => {
        if (!listDelTopic) {
            dispatch(ListTrashTopic1({ isDeleted: true }));
        }
    }, [dispatch, listDelTopic]);
    console.log(listDelTopic)
    const handleRestore = async (topicId) => {
        try {
            await dispatch(TopicRestore({ topic_id: topicId, isDeleted: true }));
            dispatch(ListTrashTopic1({ isDeleted: true }));
            toast.success("Phục hồi thành công!");
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi phục hồi!");
        }
    };

    const handleDelete = (topicId) => {
        try {
            dispatch(RemoveTopic({ topic_id: topicId }));
            dispatch(ListTrashTopic1({ isDeleted: true }));
            toast.success("Xóa thành công!");
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi xóa!");
        }
    };



    return (
        <div className="content-wrapper">
            <section className="content">
                <div className="card">
                    <div className="card-header text-right">
                        <Link to="/topic/topiclist" className="btn btn-sm btn-info">
                            <i className="fa fa-reply me-1" aria-hidden="true"></i>
                            Quay lại
                        </Link>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                {listDelTopic && listDelTopic.length > 0 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="text-left">Tên</th>
                                                <th className="text-left">Mô tả</th>
                                                <th className="text-left">Ngày tạo</th>
                                                <th className="text-left">Chức năng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listDelTopic.map((item, index) => (
                                                <tr className="datarow" key={index}>
                                                    <td className="text-left">{item.topic_name}</td>
                                                    <td className="text-left">{item.topic_description}</td>
                                                    <td className="text-left">{item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}</td>
                                                    <td className="text-left">
                                                        <div className="function_style">
                                                            <button className="btn btn-sm" onClick={() => handleRestore(item._id)}>
                                                                <CIcon icon={cilPencil} title="Restore" /> Phục hồi
                                                            </button> |
                                                            <button className="btn btn-sm" onClick={() => handleDelete(item._id)}>
                                                                <CIcon icon={cilDelete} title="Delete" /> Xoá
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="text-center">
                                        <p>Hiện tại không có rác !</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ListTrashTopic;
