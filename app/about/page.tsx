import db from "@/utils/db";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

async function AboutPage() {
    const products = await db.testProfile.create({
        data: {
            name: "Alice",
        }
    })
    const users = await db.testProfile.findMany()
    return (
        <div>
            {users.map((user: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; })=> {
                return (
                    <h2 key={user.id} className="text-2xl font-bold">
                        {user.name}
                    </h2>
                )
            })}
        </div>
    )
}
export default AboutPage;