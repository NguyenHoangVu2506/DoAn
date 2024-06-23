import { useEffect } from "react";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilDelete, cilPencil } from "@coreui/icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { ListTrashPage1, PageRestore, RemovePage } from "../../../store/actions/page-actions";
function ListTrashPage() {
    const dispatch = useDispatch();
    const { listDelPage } = useSelector((state) => state.pageReducer);

    useEffect(() => {
        if (!listDelPage) {
            dispatch(ListTrashPage1({ isDeleted: true }));
        }
    }, [dispatch, listDelPage]);
    console.log(listDelPage)
    const handleRestore = async (pageId) => {
        try {
            await dispatch(PageRestore({ page_id: pageId, isDeleted: true }));
            dispatch(ListTrashPage1({ isDeleted: true }));
            toast.success("Phục hồi thành công!");
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi phục hồi!");
        }
    };

    const handleDelete = (pageId) => {
        try {
            dispatch(RemovePage({ page_id: pageId }));
            dispatch(ListTrashPage1({ isDeleted: true }));
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
                        <Link to="/page/pagelist" className="btn btn-sm btn-info">
                            <i className="fa fa-reply me-1" aria-hidden="true"></i>
                            Quay lại
                        </Link>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                {listDelPage && listDelPage.length > 0 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="text-left">Hình ảnh</th>
                                                <th className="text-left">Tên</th>
                                                <th className="text-left">Tiêu đề</th>
                                                <th className="text-left">Ngày tạo</th>
                                                <th className="text-left">Chức năng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listDelPage.map((item, index) => (
                                                <tr className="datarow" key={index}>
                                                    <td className="text-left">
                                                        <img src={item.page_image} alt={item.page_name} style={{ width: "70px" }} />
                                                    </td>
                                                    <td className="text-left">{item.page_name}</td>
                                                    <td className="text-left">{item.page_title}</td>
                                                    <td className="text-left">{item.createdOn ? new Date(item.createdOn).toLocaleString() : ''}</td>
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

export default ListTrashPage;
