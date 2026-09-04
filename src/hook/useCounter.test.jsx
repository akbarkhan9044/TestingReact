import { describe,it,expect } from "vitest";
import { render,renderHook,act,waitFor,screen } from "@testing-library/react";
import {useCounter}  from "./useCounter";


describe("useCounter Test",()=>{
    it("Check for initial value",()=>{
        const {result}=renderHook(()=>useCounter(12));
        expect(result.current.count).toBe(12);
        expect(result.current.count).not.toBe(10)
    });

    it("Increase Counter",()=>{
        const {result}=renderHook(()=>useCounter(5));
        act(()=>{
            result.current.increment();
        })
        expect(result.current.count).toBe(6);
    });
    it("Decrese the counter",()=>{
        const {result}=renderHook(()=>useCounter(8));
        act(()=>{
            result.current.decrement();
        });
        expect(result.current.count).toBe(7);
        expect(result.current.count).not.toBe(9);
    });

    it("reset the counter",()=>{
        const {result}=renderHook(()=>useCounter(19));
        act(()=>{
            result.current.increment();
            result.current.increment();
        });
        expect(result.current.count).toBe(21);
        act(()=>{
            result.current.reset();
        });
        expect(result.current.count).toBe(19);
    })
})