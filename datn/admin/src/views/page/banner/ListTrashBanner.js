import { useEffect } from "react";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilDelete, cilPencil } from "@coreui/icons";
import { useDispatch, useSelector } from "react-redux";
import { BannerRestore, ListTrashBanner1, RemoveBanner } from "../../../store/actions";
function ListTrashBanner() {
    const dispatch = useDispatch();
    const { listDelSlider } = useSelector((state) => state.sliderReducer);

    useEffect(() => {
        if (!listDelSlider) {
            dispatch(ListTrashBanner1({ isDeleted: true }));
        }
    }, [dispatch, listDelSlider]);
    console.log(listDelSlider)
    const handleRestore = async (sliderId) => {
        try {
            await dispatch(BannerRestore({ slider_id: sliderId, isDeleted: true }));
            dispatch(ListTrashBanner1({ isDeleted: true }));
            toast.success("Phục hồi thành công!");
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi phục hồi!");
        }
    };

    const handleDelete = (sliderId) => {
        try {
            dispatch(RemoveBanner({ slider_id: sliderId }));
            dispatch(ListTrashBanner1({ isDeleted: true }));
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
                        <Link to="/banner/bannerlist" className="btn btn-sm btn-info">
                            <i className="fa fa-reply me-1" aria-hidden="true"></i>
                            Quay lại
                        </Link>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                {listDelSlider && listDelSlider.length > 0 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="text-left" style={{ width: "130px" }}>Hình ảnh</th>
                                                <th className="text-left">Tên banner</th>
                                                <th className="text-left">Link</th>
                                                <th className="text-left">Vị trí</th>
                                                <th className="text-left">Ngày tạo</th>
                                                <th className="text-left">Chức năng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listDelSlider.map((item, index) => (
                                                <tr className="datarow" key={index}>
                                                    <td className="text-left">
                                                        <img src={item.slider_image} alt={item.slider_name} style={{ width: "70px" }} />
                                                    </td>
                                                    <td className="text-left">{item.slider_name}</td>
                                                    <td className="text-left">{item.slider_link}</td>
                                                    <td className="text-left">{item.slider_position}</td>
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

export default ListTrashBanner;
