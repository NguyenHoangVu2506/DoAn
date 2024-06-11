import { Link } from "react-router-dom";

export default function Menu ()  {
    <ul>
        <li class="nav-item">
            <a class="nav-link text-dark" href="#">THƯƠNG HIỆU</a>
        </li>
        <li class="nav-item">
            <a class="nav-link text-dark" href="#">BÁN CHẠY</a>
        </li>
        <li class="nav-item">
            <a class="nav-link text-dark" href="#">HÀNG MỚI VỀ</a>
        </li>
        <li class="nav-item">
            <Link to="/blog" class="nav-link text-dark">BÀI VIẾT</Link>
        </li>
        <li class="nav-item">
            <a class="nav-link text-dark" href="#">LIÊN HỆ</a>
        </li>
    </ul>

};