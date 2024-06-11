export default function Contact(){
    return (
        <section class="Contact">
        <div class="container py-2 ">
            <div class="row contact-gt">
                <h3>THÔNG TIN LIÊN HỆ</h3>
            </div>
            <div class="row">
                <div class="col-md-8 ">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.6657492434838!2d106.77668396955154!3d10.837081299332215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752705ce300001%3A0x1a1c453504c28d03!2sC%C3%B4ng%20Ty%20Tnhh%20Umt%20Vi%E1%BB%87t%20Nam!5e0!3m2!1svi!2sus!4v1715348897336!5m2!1svi!2sus"
                        style={{width:"600px", height:"450px" ,border:"0" ,allowfullscreen:"" ,loading:"lazy",
                        referrerpolicy:"no-referrer-when-downgrade"}}></iframe>
                </div>

                <div class="col-md-4 ">
                    <form class="form text-danger" onSubmit="{}" method="post">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"><i>Họ Tên Khách Hàng</i></label>
                            <input type="text" class="form-control" id="exampleFormControlInput1"
                                placeholder="Nhập họ tên" />
                        </div>

                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"><i>Số Điện Thoại</i></label>
                            <input type="text" class="form-control" id="exampleFormControlInput1"
                                placeholder="Nhập sđt" />
                        </div>

                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"><i>Email</i></label>
                            <input type="email" class="form-control" id="exampleFormControlInput1"
                                placeholder="Nhập email" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"><i>Chủ đề</i></label>
                            <input type="text" class="form-control" id="exampleFormControlInput1"
                                placeholder="Nhập chủ đề" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label"><i>Nội dung</i></label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                name="content"></textarea>
                        </div>
                        <button type="submit" class="btn btn-rounded mr-2 left" style={{ backgroundColor: '#f6831f', color: 'white', textAlign: 'right' }} data-mdb-ripple-init >Gửi</button>
                    </form>
                </div>

            </div>
        </div>
    </section>

    )
    
}