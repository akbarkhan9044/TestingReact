import { describe,it,expect } from "vitest";
import { render,renderHook,act,waitFor,screen } from "@testing-library/react";
import { MemoryRouter,Routes,Route,useNavigate,Link } from "react-router-dom";
import userEvent from "@testing-library/user-event";


function Home(){
    return(
        <div>
            <h1>Welcome to Home</h1>
            <Link to="/profile">Profile</Link>
        </div>
    )
}
    function Profile(){
        return(
            <h1>Welcome to Profile</h1>
        )
    }

    function Login(){
        const naviagte=useNavigate();
        return(
            <>
            <h1>Login</h1>
            <button onClick={()=>{naviagte("/dashboard")}}>
                Continue
            </button>
            </>
        )
    }
    function Dashboard(){
        return(
            <div>
                <h1>Welcome to Dashboard</h1>
            </div>
        )
    }

    describe("Link Testing",()=>{
        it("Home Profile Link Testing",async()=>{
            render(
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<Home/>} />
 
                        <Route path="/profile" element={<Profile/>}/>
                    </Routes>
                </MemoryRouter>
            )
            const user=await userEvent.setup();

            expect(screen.getByRole("heading",{name:/Welcome to Home/i})).toBeInTheDocument();
            await user.click(screen.getByRole("link",{name:/profile/i}));
            expect(screen.getByRole("heading",{name:/Welcome to Profile/i})).toBeInTheDocument();


        })

        it("Login useNavigate Testing",async()=>{
            render(
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="/login" element={<Login/>} />
                          <Route path="/dashboard" element={<Dashboard/>} />
                    </Routes>
                </MemoryRouter>
            )
            const user=userEvent.setup();

            expect(screen.getByRole("heading",{name:/login/i})).toBeInTheDocument();
            await user.click(screen.getByRole("button",{name:/Continue/i}));

            expect(screen.getByRole("heading",{name:/Welcome to Dashboard/i})).toBeInTheDocument();

        })
    })