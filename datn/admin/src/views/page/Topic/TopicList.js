import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CButton } from '@coreui/react';
import { cilTrash, cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { getListBlog, getTopic } from '../../../store/actions';

function TopicList() {
    const dispatch = useDispatch();
    const { allBlog } = useSelector((state) => state.blogReducer);
    const { allTopic } = useSelector((state) => state.topicReducer);

    useEffect(() => {
        if (!allBlog) {
            dispatch(getListBlog({ sort: 'ctime' }));
        }
    }, [dispatch, allBlog]);

    useEffect(() => {
        if (!allTopic) {
            dispatch(getTopic({ sort: 'ctime' }));
        }
    }, [dispatch, allTopic]);

    const getTopicName = (topicId) => {
        if (!allTopic) return ''; // Kiểm tra nếu mảng allTopic không tồn tại
        const topic = allTopic.find((topic) => topic._id === topicId);
        return topic ? topic.topic_name : '';
    };
    console.log(allTopic)
    return (
        <div className="admin content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1 className="d-inline">Danh sách Chủ đề</h1>
                        </div>
                        <div className="col-sm-1 mt-2 text-right">
                            <Link className="action-btn" to="/category/list-trash" style={{ color: 'red' }}>
                                <CIcon icon={cilTrash} title="Download file" />
                                <sup className="count ms-1">5</sup>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <Link to="/post/createtopic">
                                        <CButton color="primary" className="me-md-2">
                                            <CIcon icon={cilPlus} title="Download file" />
                                            Thêm chủ đề
                                        </CButton>
                                    </Link>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ width: '30px' }}></th>
                                            <th className="text-center" style={{ width: '30px' }}>Id</th>
                                            <th style={{ width: '220px' }}>Tên chủ đề</th>
                                            <th className="text-center" style={{ width: '130px' }}>Mô tả</th>
                                            <th className="text-center" style={{ width: '130px' }}>Ngày tạo</th>
                                            <th className="text-center" style={{ width: '150px' }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allTopic && allTopic.map((topic, index) => (
                                            <tr className="datarow" key={index}>
                                                <td><input type="checkbox" /></td>
                                                <td>{topic._id}</td>
                                                <td><div className="name">{topic.topic_name}</div></td>
                                                <td><div className="name">{topic.topic_description}</div></td>

                                                <td>{topic.createdAt}</td>
                                                <td>
                                                    <div className="function_style">
                                                        <Link to="" className="btn btn-sm">
                                                            <i className="fa fa-edit me-1"></i>Chỉnh sửa
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
