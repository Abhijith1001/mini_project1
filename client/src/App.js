import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/signup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import ShelterLogin from "./components/shelter/Login";
import ShelterSignup from "./components/shelter/Sign up";
import Mainn from "./components/shelter/Mainn";


function App() {
	const user = localStorage.getItem("token");
	const shelter = localStorage.getItem("stoken");


	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={user ? <Navigate to="/" /> : <Signup />} />
			<Route path="/login" exact element={user ? <Navigate to="/" /> : <Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/forgot-password" element={<ForgotPassword />}/>
			<Route path="/password-reset/:id/:token" element={<PasswordReset />} />

			{shelter && <Route path="/mainn" exact element={<Mainn />} />}
			<Route path="/mainn" element={<Navigate replace to="/shelterlogin" />} />
			<Route path="/shelterlogin" element={shelter ? <Navigate to="/mainn" /> :<ShelterLogin />} />
			<Route path="/sheltersignup" element={shelter ? <Navigate to="/mainn" /> :<ShelterSignup />} />


		</Routes>
	);
}

export default App;
