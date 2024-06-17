import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newContact } from "../../../store/actions";
import { toast } from 'react-toastify';
import { MDBBtn, MDBCardText, MDBCol, MDBInput, MDBRow, MDBValidationItem } from "mdb-react-ui-kit";


export default function Contact() {
    const dispatch = useDispatch();

    const [contact_user_name, setContactName] = useState('');
    const [contact_user_phone, setContactPhone] = useState('');
    const [contact_user_email, setContactEmail] = useState('');
    const [contact_user_tilte, setContactTitle] = useState('');
    const [contact_user_detail, setContactDetail] = useState('');


    const handleInsert = async () => {

        try {
            await dispatch(newContact({
                contact_user_name: contact_user_name,
                contact_user_email: contact_user_email,
                contact_user_phone: contact_user_phone,
                contact_user_tilte: contact_user_tilte,
                contact_user_detail: contact_user_detail
            }))
            setContactName('')
            setContactPhone('')
            setContactEmail('')
            setContactTitle('')
            setContactDetail('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section class="Contact">
            <div className="bg-" style={{ backgroundColor: '#f6831f' }} >
                <div className="container py-4 " >
                    {/*<!-- Breadcrumb --> */}
                    <nav className="d-flex" >
                        <h6 className="mb-0">
                            <a href="" className="text-white">Trang chủ</a>
                            <span className="text-white-50 mx-2">/ </span>
                            <a href="" className="text-white">Liên Hệ</a>

                        </h6>
                    </nav>
                    {/*<!-- Breadcrumb --> */}
                </div>
            </div>

            <div class="container py-2 ">
                <div class="row contact-gt">
                    <h3>THÔNG TIN LIÊN HỆ</h3>
                </div>
                <div class="row">
                    <div class="col-md-8 ">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.6657492434838!2d106.77668396955154!3d10.837081299332215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752705ce300001%3A0x1a1c453504c28d03!2sC%C3%B4ng%20Ty%20Tnhh%20Umt%20Vi%E1%BB%87t%20Nam!5e0!3m2!1svi!2sus!4v1715348897336!5m2!1svi!2sus"
                            style={{
                                width: "600px", height: "450px", border: "0", allowfullscreen: "", loading: "lazy",
                                referrerpolicy: "no-referrer-when-downgrade"
                            }}></iframe>
                    </div>

                    <div class="col-md-4 ">

                        <form>
                            <MDBRow className='mb-4'>
                                <MDBCol>
                                    <MDBValidationItem>
                                        <MDBInput id='form6Example1'
                                            value={contact_user_name}
                                            name='Nhập họ tên'
                                            onChange={(e) => setContactName(e.target.value)}
                                            required label='Họ và Tên' />
                                    </MDBValidationItem>

                                </MDBCol>

                            </MDBRow>
                            <MDBValidationItem>
                                <MDBInput wrapperClass='mb-4 ' type='email' id='form6Example5' label='Email' value={contact_user_email}
                                    name='Nhập email'
                                    onChange={(e) => setContactEmail(e.target.value)}
                                    required /></MDBValidationItem>

                            <MDBValidationItem> <MDBInput wrapperClass='mb-4' type='tel' id='form6Example6' label='Số Điện Thoại' value={contact_user_phone}
                                name='Nhập sđt'
                                onChange={(e) => setContactPhone(e.target.value)}
                                required
                            /></MDBValidationItem>


                            <MDBValidationItem> <MDBInput wrapperClass='mb-4' id='form6Example4' label='Chủ đề' value={contact_user_tilte}
                                name='Nhập chủ đề'
                                onChange={(e) => setContactTitle(e.target.value)}
                                required /></MDBValidationItem>

                            <MDBValidationItem> <MDBInput wrapperClass='mb-4 ' textarea id='form6Example7'
                                label='Nhập nội dung' name="content"
                                value={contact_user_detail}
                                onChange={(e) => setContactDetail(e.target.value)}
                                required ></MDBInput></MDBValidationItem>



                            <MDBBtn className='mb-4 btn mr-2 left' type='submit' onClick={() => handleInsert()} style={{ backgroundColor: '#f6831f', color: 'white', textAlign: 'right' }} >
                                Gửi
                            </MDBBtn>
                        </form>


                        {/* <form class="form text-danger" onSubmit={newContact} method="post">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label"><i>Họ Tên Khách Hàng</i></label>
                                <input type="text" class="form-control" id="exampleFormControlInput1"
                                    placeholder="Nhập họ tên"
                                    value={contact_user_name}
                                    name='Nhập họ tên'
                                    onChange={(e) => setContactName(e.target.value)}
                                    required
                                    label='Nhập họ tên' />
                            </div>

                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label"><i>Số Điện Thoại</i></label>
                                <input type="text" class="form-control" id="exampleFormControlInput1"
                                    placeholder="Nhập sđt"
                                    value={contact_user_phone}
                                    name='Nhập sđt'
                                    onChange={(e) => setContactPhone(e.target.value)}
                                    required
                                    label='Nhập sđt' />
                            </div>

                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label"><i>Email</i></label>
                                <input type="email" class="form-control" id="exampleFormControlInput1"
                                    placeholder="Nhập email"
                                    value={contact_user_email}
                                    name='Nhập email'
                                    onChange={(e) => setContactEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label"><i>Chủ đề</i></label>
                                <input type="text" class="form-control" id="exampleFormControlInput1"
                                    placeholder="Nhập chủ đề"
                                    value={contact_user_tilte}
                                    name='Nhập chủ đề'
                                    onChange={(e) => setContactTitle(e.target.value)}
                                    required />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label"><i>Nội dung</i></label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                    name="content"
                                    value={contact_user_detail}
                                    onChange={(e) => setContactDetail(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" onClick={() => handleInsert()} class="btn btn-rounded mr-2 left" style={{ backgroundColor: '#f6831f', color: 'white', textAlign: 'right' }} data-mdb-ripple-init >Gửi</button>
                        </form> */}
                    </div>

                </div>
            </div>
        </section>

    )

}