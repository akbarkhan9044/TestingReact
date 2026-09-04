import { describe,it,expect } from "vitest";
import { render,renderHook,act,waitFor,screen } from "@testing-library/react";
import Counter from "./Counter";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

describe("Counter Testing",()=>{
    it("Increment the counter testing",async()=>{
        render(
            <MemoryRouter>
                  <Counter/>
            </MemoryRouter>
        )
        const user=userEvent.setup();
        expect(screen.getByLabelText("Current count: 0")).toBeInTheDocument();
         await user.click(screen.getByRole("button",{name:/Increase count/i}));
         expect(screen.getByLabelText("Current count: 1")).toBeInTheDocument();

    });

    it("decrement",async()=>{
        render(<MemoryRouter>
            <Counter/>
        </MemoryRouter>)
        const user=await userEvent.setup();
        expect(screen.getByLabelText("Current count: 0")).toBeInTheDocument();
          
        await user.click(screen.getByRole("button",{name:/Increase count/i}));
        expect(screen.getByLabelText("Current count: 1")).toBeInTheDocument();

        await user.click(screen.getByRole("button",{name:/Increase count/i}));
        expect(screen.getByLabelText("Current count: 2")).toBeInTheDocument();

        await user.click(screen.getByRole("button",{name:/decrease count/i}));
        expect(screen.getByLabelText("Current count: 1")).toBeInTheDocument();
        expect(screen.queryByLabelText("Current count: 2")).not.toBeInTheDocument();


    })

    it("reset",async()=>{
        render(
            <MemoryRouter>
                <Counter/>
            </MemoryRouter>
        )

            const user=userEvent.setup();
        expect(screen.getByLabelText("Current count: 0")).toBeInTheDocument();
        await user.click(screen.getByRole("button",{name:/increase count/i}));
        expect(screen.getByLabelText("Current count: 1")).toBeInTheDocument();
        await user.click(screen.getByRole("button",{name:/reset/i}));
        expect(screen.getByLabelText("Current count: 0")).toBeInTheDocument();
        expect(screen.getByRole("button",{name:/reset/i})).toBeDisabled();

    })
})