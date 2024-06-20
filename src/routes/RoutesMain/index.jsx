import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import { ProtectedRoutes } from "../../components/ProtectedRoutes";
import { Course } from "../../pages/Course";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import { PublicRoutes } from '../../components/PublicRoutes/index';
import { Dashboard } from "../../pages/Dashboard";
import CourseRegister from "../../pages/CourseRegister";
import CourseEdit from "../../pages/CourseEdit";
import RegisterAdm from "../../pages/RegisterAdm";
import LoginAdmin from "../../pages/LoginAdmin";

const RoutesMain = () => {

    return (
        <Routes>
            
            <Route path="/" element={<Home />} />

            <Route path="/course/register" element={<CourseRegister />} />
            <Route path="/course/:courseId" element={<Course />} />
            <Route path="/course/edit/:courseId" element={<CourseEdit />} />
            
            <Route path="/login" element={<Login /> } />
            <Route path="/users/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/admins/login" element={<LoginAdmin />} />
            <Route path="/admins/register" element={<RegisterAdm />} />

            {/* <Route element={<ProtectedRoutes />} >
                <Route path="/course/register" element={<CourseRegister />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Route> */}

        </Routes>
    );
};

export default RoutesMain;