import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../store/configStore/useAppDispatch';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false 
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Geçerli bir email giriniz").required("Email alanı boş bırakılamaz"),
      password: Yup.string().required("Şifre alanı boş bırakılamaz")
    }),
    onSubmit: async (values) => {
      try {
        const resultAction = dispatch(loginUser(values));

        if (loginUser.fulfilled.match(resultAction)) {
          //console.log("Login successful!");
          window.location.reload();
        } else if (loginUser.rejected.match(resultAction)) {
          console.error("Login error:", resultAction.error);
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  });

  const handleGoRegister = () => {
    navigate("/register");
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
    <label htmlFor="email">Email:</label>
    <input
        type="email"
        id="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
    />
    {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
    ) : null}

    <label htmlFor="password">Şifre:</label>
    <input
        type="password"
        id="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
    />
    {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
    ) : null}

    <label>
        <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formik.values.rememberMe}
            onChange={formik.handleChange}
        />
        Beni Hatırla
    </label>

    <button type="submit">Giriş Yap</button>
    <button type="button" onClick={handleGoRegister}>
        Kayıt Ol
    </button>
</form>

    </div>
  );
};

export default Login;
