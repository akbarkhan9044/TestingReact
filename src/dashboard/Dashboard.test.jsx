import { describe,it,act,expect } from "vitest";
import { render,renderHook,screen,waitFor} from "@testing-library/react";
import { MemoryRouter,Route,Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Customer from "./Customer";
import userEvent from "@testing-library/user-event";
describe("Dashboard",()=>{
    it("Dashboard ",async()=>{
        render(
            <MemoryRouter initialEntries={["/dashboard"]}>
                <Routes>
                 <Route
                        path="/dashboard" element={<Dashboard/>}
                        >
                          <Route path="profile" element={<Profile/>} />
                          <Route path="customer" element={<Customer/>} />
                        </Route>
                        </Routes>
            </MemoryRouter>
        );
        const user=userEvent.setup();
             expect(screen.getByRole("heading",{name:/Welcome to Dashboard/i})).toBeInTheDocument();
            expect(screen.queryByRole("heading",{name:/Welcome to Profile/i})).not.toBeInTheDocument();
            await user.click(screen.getByRole("link",{name:/Profile/i}))

            expect(screen.getByRole("heading",{name:/Welcome to Profile/i})).toBeInTheDocument();
            expect(screen.getByRole("heading",{name:/Welcome to Dashboard/i})).toBeInTheDocument();
            expect(screen.queryByRole("heading",{name:/Welcome to Customer/i})).not.toBeInTheDocument();
    
            await user.click(screen.getByRole("link",{name:/Customer/i}));

            expect(screen.getByRole("heading",{name:/Welcome to Customer/i})).toBeInTheDocument();
            expect(screen.getByRole("heading",{name:/Welcome to Dashboard/i})).toBeInTheDocument();
            expect(screen.queryByRole("heading",{name:/Welcome to Profile/i})).not.toBeInTheDocument();
        });





      

    
})
