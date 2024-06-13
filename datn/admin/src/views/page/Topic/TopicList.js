import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CButton } from '@coreui/react';
import { cilTrash, cilPlus, cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { getListBlog, getTopic } from '../../../store/actions';

function TopicList() {
    const dispatch = useDispatch();
    const { allTopic } = useSelector((state) => state.topicReducer);


    useEffect(() => {
        if (!allTopic) {
            dispatch(getTopic({ sort: 'ctime' }));
        }
    }, [dispatch, allTopic]);
    console.log(allTopic)
    return (
        <div className="admin content-wrapper">
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-begin">
                                    <Link to='/topic/createtopic'>
                                        <CButton color="primary" variant="outline" className="me-md-2">
                                            <CIcon icon={cilPlus} title="Store page" />
                                            Thêm chủ đề
                                        </CButton>
                                    </Link>
                                    <Link to='/page/createpage'>
                                        <CButton color="danger" variant="outline" className="me-md-2">
                                            <CIcon icon={cilTrash} title="Store page" /> Thùng rác
                                        </CButton>
                                    </Link>
                                </div>
                                <hr />
                                <table className="table ">
                                    <thead>
                                        <tr>
                                            <th className="text-left" style={{ width: '220px' }}>Tên chủ đề</th>
                                            <th className="text-left" >Mô tả</th>
                                            <th className="text-left" style={{ width: '130px' }}>Ngày tạo</th>
                                            <th className="text-left" style={{ width: '150px' }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allTopic && allTopic.map((topic, index) => (
                                            <tr className="datarow" key={index}>

                                                <td><div className="text-left">{topic.topic_name}</div></td>
                                                <td><div className="text-left">{topic.topic_description}</div></td>

                                                <td className="text-left">{topic.createdAt}</td>
                                                <td className="text-left">
                                                    <div className="function_style">
                                                        <Link to={`/topic/updatetopic/${topic._id}`} className="btn btn-sm">
                                                            <CIcon icon={cilPencil} title="Delete" /> Chỉnh sửa
                                                        </Link> |
                                                        <button className="btn btn-sm">
                                                            <CIcon icon={cilTrash} title="Delete" /> Xoá
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default TopicList;
