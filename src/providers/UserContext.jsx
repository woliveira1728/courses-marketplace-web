import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";

export const UserContext = createContext({});

export const UserProvider = ({children}) => {
    const [isAdmin, setIsAdmin] = useState(null);
    const [isUser, setIsUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const localCourseList = localStorage.getItem("@COURSEMARKETPLACE:CourseList");
    const [ courseList, setCourseList ] = useState(localCourseList ? JSON.parse(localCourseList) : []);
    const localCartList = localStorage.getItem("@COURSEMARKETPLACE:CartList");
    const [cartList, setCartList] = useState(localCartList ? JSON.parse(localCartList) : []);
    const localMyCoursesList = localStorage.getItem("@COURSEMARKETPLACE:MyCoursesList");
    const [myCoursesList, setMyCoursesList] = useState(localMyCoursesList ? JSON.parse(localMyCoursesList) : []);
    const localMyCoursesForSale = localStorage.getItem("@COURSEMARKETPLACE:myCoursesForSale");
    const [myCoursesForSale, setMyCoursesForSale] = useState(localMyCoursesForSale? JSON.parse(localMyCoursesForSale) : []);
    const localAllCoursesForAdm = localStorage.getItem("@COURSEMARKETPLACE:allCoursesForAdm");
    const [allCoursesForAdm, setAllCoursesForAdm] = useState(localAllCoursesForAdm? JSON.parse(localAllCoursesForAdm) : []);
    const localAllUsersForAdm = localStorage.getItem("@COURSEMARKETPLACE:allUsersForAdm");
    const [allUsersForAdm, setAllUsersForAdm] = useState(localAllUsersForAdm? JSON.parse(localAllUsersForAdm) : []);
    const [ isLoading, setIsLoading] = useState(false);
    const [ isCartOpen, setIsCartOpen] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    
    const navigate = useNavigate();
  
    const errorLoginMessage = () => {
        toast.error("Login ou senha inválidos!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    const successCreateAccount = () => {
        toast.success("Conta criada com sucesso!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    const errorCreateAccount = () => {
        toast.error("Ops! Algo deu errado", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    const successMessage = () => {
        toast.success("Item adicionado ao carrinho!", {
           position: "top-right",
           autoClose: 3000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
        });
    };
  
    const warnMessage = () => {
        toast.warn("Item já está no carrinho!", {
           position: "top-right",
           autoClose: 3000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
        });
    };

    useEffect(() => {
        const loadUser = async () => {
           const tokenAdm = localStorage.getItem("@COURSEMARKETPLACE:tokenAdm");
           const token = localStorage.getItem("@COURSEMARKETPLACE:token");

           if (tokenAdm) {
                try {
                    const { data } = await api.get("/admin/profile", {
                    headers: {
                        Authorization: `Bearer ${tokenAdm}`,
                    },
                    });
                    setIsAdmin(data);
                    setIsLogged(true);
                    navigate("/dashboard");
                } catch (error) {
                    console.log(error);
                    navigate("/");
                }
            }

           if (token) {
              try {
                const { data } = await api.get("/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                });
                setIsUser(data);
                const isSeller = data.isSeller;
                setIsSeller(isSeller);
                setIsLogged(true);
                navigate("/");
              } catch (error) {
                console.log(error);
                navigate("/");
              }
           }
        };
        loadUser();
    }, []);

    useEffect(() => {
        const loadCourseList = async () => {
            const { data } = await api.get("/courses")
            setCourseList(data);
        };
        loadCourseList();
    }, []);

    const loadCourseList = async () => {
        const { data } = await api.get("/courses")
        setCourseList(data);
    };

    useEffect(() => {
        localStorage.setItem("@COURSEMARKETPLACE:CourseList", JSON.stringify(courseList))
    }, [courseList]);

    useEffect(() => {
        localStorage.setItem("@COURSEMARKETPLACE:CartList", JSON.stringify(cartList))
    }, [cartList]);

    useEffect(() => {
        localStorage.setItem("@COURSEMARKETPLACE:MyCoursesList", JSON.stringify(myCoursesList))
    }, [myCoursesList]);

    useEffect(() => {
        localStorage.setItem("@COURSEMARKETPLACE:myCoursesForSale", JSON.stringify(myCoursesForSale))
    }, [myCoursesForSale]);

    useEffect(() => {
        localStorage.setItem("@COURSEMARKETPLACE:allCoursesForAdm", JSON.stringify(allCoursesForAdm))
    }, [allCoursesForAdm]);

    useEffect(() => {
        localStorage.setItem("@COURSEMARKETPLACE:allUsersForAdm", JSON.stringify(allUsersForAdm))
    }, [allUsersForAdm]);

    const userRegister = async (formData) => {
        
        try {
            // setIsLoading(true);
            const { data } = await api.post("/users/register", formData);
            setIsUser(data.user);
            setIsSeller(isUser.isSeller);
            navigate("/login");
            // successCreateAccount();
        } catch (error) {
            console.log(error);
            // errorCreateAccount();
        } finally {
            setIsLoading(false);
        }
    };

    const adminRegister = async (formData) => {
        
        try {
            // setIsLoading(true);
            const { data } = await api.post("/admin/register", formData);
            setIsAdmin(data.user)
            navigate("/admins/login");
            // successCreateAccount();
        } catch (error) {
            console.log(error);
            // errorCreateAccount();
        } finally {
            setIsLoading(false);
        }
    };

    const beSalesperson = async () => {
        const token = localStorage.getItem("@COURSEMARKETPLACE:token");

        try {
            // setIsLoading(true);
            const { data } = await api.patch(`/users/update/${isUser.id}`, { isSeller: true }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsUser(data);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const adminEditUser = async (userId) => {
        const tokenAdm = localStorage.getItem("@COURSEMARKETPLACE:tokenAdm");

        try {
            // setIsLoading(true);
            setIsSeller(!isSeller);
            const { data } = await api.patch(`/admin/users/${userId}`, { isSeller }, {
                headers: {
                    Authorization: `Bearer ${tokenAdm}`,
                },
            });
            setAllUsersForAdm(prevUsers => prevUsers.map(user => user.id === userId ? data : user));
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const userLogin = async (formData) => {
        
        try {
            // setIsLoading(true);
            const { data } = await api.post("/users/login", formData);
            localStorage.setItem("@COURSEMARKETPLACE:token", data.accessToken);
            setIsUser(data.user);
            const isSeller = data.user.isSeller;
            setIsSeller(isSeller);
            setIsLogged(true);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            // errorLoginMessage();
        } finally {
            setIsLoading(false);
        }
    };

    const adminLogin = async (formData) => {
        
        try {
            setIsLoading(true);
            const { data } = await api.post("/admin/login", formData);
            localStorage.setItem("@COURSEMARKETPLACE:tokenAdm", data.accessToken);
            setIsAdmin(data.user);
            setIsLogged(true);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            // errorLoginMessage();
        } finally {
            setIsLoading(false);
        }
    };

    const adminEditStatusCourse = async (courseId, status) => {
        const tokenAdm = localStorage.getItem("@COURSEMARKETPLACE:tokenAdm");

        const editedCourse = { status }

        try {
            // setIsLoading(true);
            const { data } = await api.patch(`/admin/courses/${courseId}/status`, editedCourse, {
                headers: {
                    Authorization: `Bearer ${tokenAdm}`,
                },
            });
            setAllCoursesForAdm(prevCourses => prevCourses.map(course => course.id === courseId ? data : course));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const userLogOut = () => {
        setIsLoading(true);
        localStorage.removeItem("@COURSEMARKETPLACE:tokenAdm");
        localStorage.removeItem("@COURSEMARKETPLACE:token");
        setIsAdmin(null);
        setIsUser(null);
        setIsSeller(false);
        setIsLogged(false);
        setMyCoursesForSale([]);
        setAllCoursesForAdm([]);
        setTimeout(() => {
            navigate("/")
            setIsLoading(false);
        }, "1000");

    };

    const buyAllCourse = async (formData) => {
        const token = localStorage.getItem("@COURSEMARKETPLACE:token");

        try {
            setIsLoading(true);
            const { data } = await api.post("/transactions", formData, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const buyCourse = async (course) => {
        const token = localStorage.getItem("@COURSEMARKETPLACE:token");

        const transaction = {
            courseId: course.id,
            ownerId: course.ownerId,
            price: course.price,
            buyerId: isUser.id
        }

        try {
            const { data } = await api.post("/transactions", transaction, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            });

            setMyCoursesList(prevCourses => [...prevCourses, course]);
            navigate("/dashboard");
            console.log("Curso comprado com sucesso:", data);
        } catch (error) {
            console.error("Erro ao comprar curso:", error);
        }

    };

    const courseRegister = async (formData) => {
        formData.price = parseInt(formData.price);
        const newCourse = {...formData, status: "PENDING"};
        const token = localStorage.getItem("@COURSEMARKETPLACE:token");

        try {
            // setIsLoading(true);
            const { data } = await api.post("/courses/register", newCourse, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // successMessage();
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            userLogOut();
        } finally {
            setIsLoading(false);
        }

    };

    const getAllCoursesForAdm = async () => {
        const token = localStorage.getItem("@COURSEMARKETPLACE:tokenAdm");
        try {
            // setIsLoading(true);
            const { data } = await api.get("/admin/courses", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAllCoursesForAdm(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getAllUsersForAdm = async () => {
        const token = localStorage.getItem("@COURSEMARKETPLACE:tokenAdm");
        try {
            // setIsLoading(true);
            const { data } = await api.get("/admin/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAllUsersForAdm(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const courseEdit = async (courseId, formData) => {
        formData.price = parseInt(formData.price);
        const token = localStorage.getItem("@COURSEMARKETPLACE:token");

        try {
            // setIsLoading(true);
            const { data } = await api.patch(`/courses/${courseId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMyCoursesForSale(prevCourses => prevCourses.map(course => course.id === courseId ? data : course));
            // successMessage();
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    };

    const courseDelete = async (courseId) => {
        const token = localStorage.getItem("@COURSEMARKETPLACE:token");

        try {
            // setIsLoading(true);
            const { data } = await api.delete(`/courses/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMyCoursesForSale(prevCourses => prevCourses.filter(course => course.id !== courseId));
            // successMessage();
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    };

    const admCourseDelete = async (courseId) => {
        const tokenAdm = localStorage.getItem("@COURSEMARKETPLACE:tokenAdm");

        try {
            // setIsLoading(true);
            const { data } = await api.delete(`/admin/courses/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${tokenAdm}`
                }
            });
            setMyCoursesForSale(prevCourses => prevCourses.filter(course => course.id !== courseId));
            // successMessage();
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    };

    const admUserDelete = async (userId) => {
        const tokenAdm = localStorage.getItem("@COURSEMARKETPLACE:tokenAdm");

        try {
            // setIsLoading(true);
            const { data } = await api.delete(`/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${tokenAdm}`
                }
            });
            setAllUsersForAdm(prevUsers => prevUsers.filter(user => user.id !== userId));
            // successMessage();
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    };

    const getMyCourses = async () => {
        const token = localStorage.getItem("@COURSEMARKETPLACE:token");

        const { data } = await api.get("/users/purchased-courses", {
            headers: {
              Authorization: `Bearer ${token}`
            }
        });

        setMyCoursesList(data);

    };

    const getMyCoursesForSale = async () => {
        const token = localStorage.getItem("@COURSEMARKETPLACE:token");

        const { data } = await api.get("/users/my-courses-for-sale", {
            headers: {
              Authorization: `Bearer ${token}`
            }
        });

        setMyCoursesForSale(data);

    };

    const addItemCart = (cart) => {
        if(!cartList.some(car => car.id === cart.id)){
           setCartList([...cartList, cart]);
        //    successMessage();
        } else {
        //    warnMessage();
        }
    };
  
    const delItemCart = (id) => {
        const newCartList = cartList.filter(item => item.id !== id);
        setCartList(newCartList);
    };

    const delCart = () => {
        localStorage.removeItem("@COURSEMARKETPLACE:CartList");
        setCartList([]);
    };

    const buyAllInCart = () => {
        cartList.forEach(cart => {
            const transaction = {
                courseId: cart.id,
                ownerId: cart.ownerId,
                price: cart.price,
                buyerId: isUser.id
            }

            buyAllCourse(transaction);
        });
        setCartList([]);
        setIsCartOpen(false);
    };
    
    return (
        <UserContext.Provider value={{
            userRegister, userLogin, userLogOut, isUser, setIsUser, isLoading, courseList, setCourseList,
            setIsLoading, cartList, setCartList, addItemCart, delItemCart, isCartOpen, setIsCartOpen,
            delCart, buyAllInCart, beSalesperson, isSeller, setIsSeller, isLogged, setIsLogged, courseRegister, navigate, getMyCourses, myCoursesList, setMyCoursesList, buyCourse, courseEdit, myCoursesForSale, setMyCoursesForSale, getMyCoursesForSale, courseDelete, adminRegister, adminLogin, isAdmin, setIsAdmin, allCoursesForAdm, getAllCoursesForAdm,
            adminEditStatusCourse, loadCourseList, admCourseDelete, allUsersForAdm, getAllUsersForAdm, adminEditUser, admUserDelete
        }}>
            {children}
        </UserContext.Provider>
    );
};