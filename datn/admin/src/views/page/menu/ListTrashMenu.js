import { useEffect } from "react";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilDelete, cilPencil } from "@coreui/icons";
import { useDispatch, useSelector } from "react-redux";
import { ListTrashMenu1, MenuRestore, RemoveMenu } from "../../../store/actions/menu-actions";
import { toast } from "react-toastify";

function ListTrashMenu() {
    const dispatch = useDispatch();
    const { listDelMenu } = useSelector((state) => state.menuReducer);

    useEffect(() => {
        if (!listDelMenu) {
            dispatch(ListTrashMenu1({ isDeleted: true }));
        }
    }, [dispatch, listDelMenu]);
    console.log(listDelMenu)
    const handleRestore = async (menuId) => {
        try {
            await dispatch(MenuRestore({ menu_id: menuId, isDeleted: true }));
            dispatch(ListTrashMenu1({ isDeleted: true }));
            toast.success("Phục hồi thành công!");
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi phục hồi!");
        }
    };

    const handleDelete = (menuId) => {
        try {
            dispatch(RemoveMenu({ menu_id: menuId }));
            dispatch(ListTrashMenu1({ isDeleted: true }));
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
                        <Link to="/menu/menulist" className="btn btn-sm btn-info">
                            <i className="fa fa-reply me-1" aria-hidden="true"></i>
                            Quay lại
                        </Link>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                {listDelMenu && listDelMenu.length > 0 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="text-left">Tên menu</th>
                                                <th className="text-left">Link</th>
                                                <th className="text-left">Vị trí</th>
                                                <th className="text-left">Ngày tạo</th>
                                                <th className="text-left">Chức năng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listDelMenu.map((item, index) => (
                                                <tr className="datarow" key={index}>
                                                    <td className="text-left">{item.menu_name}</td>
                                                    <td className="text-left">{item.menu_link}</td>
                                                    <td className="text-left">{item.menu_position}</td>
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

export default ListTrashMenu;
