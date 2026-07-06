"use server";

interface User {
    id: string;
    name: string;
    email: string;
}

export const get = async (): Promise<User[]> => {
    const data = await fetch(`${process.env.APP_URL}/users`);
    const json = await data.json();
    return json.data;
    // console.log(json);
};