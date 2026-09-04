import { describe,it,expect } from "vitest";
import { render,renderHook,act,waitFor,screen } from "@testing-library/react";
import { MemoryRouter,Routes,Route, useParams, useSearchParams } from "react-router-dom";

function Detail(){
    const {id}=useParams();
    const [searchParams]=useSearchParams();
    const category=searchParams.get("category");
    const price=searchParams.get("price");
    return(
        <div>
            <h1>Product id: {id}</h1>
            <div>
                <p>{category}</p>
                <p>{price}</p>
            </div>
        </div>
    )
}


describe("SearchParams",()=>{
it("SearchParams Testing",async()=>{
    render(
        <MemoryRouter initialEntries={["/detail/12?category=car&price=500"]}>
            <Routes>
                <Route
                path="/detail/:id"
                element={<Detail/>}
                />
            </Routes>
        </MemoryRouter>
    )

    expect(screen.getByRole("heading",{name:/Product id: 12/})).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("car")).toBeInTheDocument();
})

});