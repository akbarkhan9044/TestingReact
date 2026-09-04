import { describe,it,expect } from "vitest";
import { render,renderHook,act,waitFor,screen } from "@testing-library/react";
import { useFetch } from "./useFetch";
import { server } from "../test/server";
import { http, HttpResponse } from "msw";


describe("useFetchTestCase",()=>{
    it("useFetch Initial Test",async()=>{
        const {result}=renderHook(()=>useFetch("https://api.example.com/users"));

        expect(result.current.loading).toBe(true);
        await waitFor(()=>{
            expect(result.current.loading).toBe(false);
        });
        expect(result.current.data).toEqual([
            { id: 1, name: 'Akbar' }
        ]);
        expect(result.current.error).toBeNullable();
    });

    it("Server error",async()=>{
        server.use(
            http.get("https://api.example.com/users",()=>{
                return HttpResponse.json({message:"Error while fetching Data"},{status:500});
            }
        ))

        const {result}=renderHook(()=>useFetch("https://api.example.com/users"));
        expect(result.current.loading).toBe(true);
        await waitFor(()=>{
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.data).toBeNull();
        expect(result.current.error).not.toBeNullable();
    })

    it("Check User",async()=>{
        const {result}=renderHook(()=>useFetch("https://jsonplaceholder.typicode.com/users/1"));
        expect(result.current.loading).toBe(true);
        await waitFor(()=>{
            expect(result.current.loading).toBe(false);
        });
        expect(result.current.error).toBeNull();
        expect(result.current.data).toEqual([
                     {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }
        ])
    })
})