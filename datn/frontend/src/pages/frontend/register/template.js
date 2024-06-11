import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Template() {
  const navigate = useNavigate()
  const handleSubmit= async()=>{
    navigate('/login')
    toast.success('hi')
  }

  return (
    <section className="bg-image" style={{ backgroundColor: 'white', height: '125vh' }}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h4 className="text-uppercase text-center mb-1">Vui lòng xác nhận Email</h4>
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-primary btn-block btn-lg gradient-custom-4 text-white"
                      onClick={handleSubmit}
                    >  Quay Lại Trang Đăng Nhập
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );



}
export default Template;