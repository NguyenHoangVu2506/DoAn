import { useEffect } from "react";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilDelete, cilPencil } from "@coreui/icons";
import { useDispatch, useSelector } from "react-redux";
import { CategoryRestore, ListTrashCategory1, RemoveCategory } from "../../../store/actions";
import { toast } from "react-toastify";

function ListTrashCategory() {
    const dispatch = useDispatch();
    const { listDelCategory } = useSelector((state) => state.categoryReducer);

    useEffect(() => {
        if (!listDelCategory) {
            dispatch(ListTrashCategory1({ isDeleted: true }));
        }
    }, [dispatch, listDelCategory]);
    console.log(listDelCategory)
    const handleRestore = async (categoryId) => {
        try {
            await dispatch(CategoryRestore({ category_id: categoryId, isDeleted: true }));
            dispatch(ListTrashCategory1({ isDeleted: true }));
            toast.success("Phục hồi thành công!");
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi phục hồi!");
        }
    };

    const handleDelete = (categoryId) => {
        try {
            dispatch(RemoveCategory({ category_id: categoryId }));
            dispatch(ListTrashCategory1({ isDeleted: true }));
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
                        <Link to="/category/categorylist" className="btn btn-sm btn-info">
                            <i className="fa fa-reply me-1" aria-hidden="true"></i>
                            Quay lại
                        </Link>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                {listDelCategory && listDelCategory.length > 0 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="text-left">Hình ảnh</th>
                                                <th className="text-left">Tên</th>
                                                <th className="text-left">Mô tả</th>
                                                <th className="text-left">Ngày tạo</th>
                                                <th className="text-left">Chức năng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listDelCategory.map((item, index) => (
                                                <tr className="datarow" key={index}>
                                                    <td className="text-left">
                                                        <img src={item.category_icon} alt={item.category_name} style={{ width: "70px" }} />
                                                    </td>
                                                    <td className="text-left">{item.category_name}</td>
                                                    <td className="text-left">{item.category_description
                                                    }</td>
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

export default ListTrashCategory;
