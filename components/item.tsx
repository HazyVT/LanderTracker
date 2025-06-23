import { renderToReadableStream } from "react-dom/server";
import type Skylander from "../models/skylander";

function Item(props: {skylander: Skylander}) {
    return (
        <div>
            {props.skylander.id} : {props.skylander.name} : {props.skylander.image}
        </div>
    )
}

export async function getAllSkylanders(skylanders: Skylander[]) {
    const stream = await renderToReadableStream(
        <div>
            {skylanders.map((sky) => {
                return <div key={sky.id}>
                    <Item skylander={sky} />
                </div>
            })}
        </div>
    )
    return stream;
}

export async function getSkylanderItem(skylander: Skylander) {
    const stream = await renderToReadableStream(
        <Item skylander={skylander} />
    )
    return stream;
}
