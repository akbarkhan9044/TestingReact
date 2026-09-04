import { describe,it,expect } from "vitest";
import { render,renderHook,act,waitFor,screen } from "@testing-library/react";
import { MemoryRouter, useParams,Routes,Route } from "react-router-dom";


function Detail(){
    const {id}=useParams();
    return<h1>Product id: {id}</h1>
}

describe("Dynamic Naviagtion",()=>{
    it("Detail Page",async()=>{
        render(
            <MemoryRouter initialEntries={["/detail/12"]}>
                <Routes>
                    
                    <Route
                    path="/detail/:id"
                    element={<Detail/>}
                    />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByRole("heading",{name:/Product id: 12/})).toBeInTheDocument();
        expect(screen.queryByRole("heading",{name:/Product id: 13/i})).not.toBeInTheDocument();
    })
})