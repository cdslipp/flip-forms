
export async function load({ params }) {
    const { action, type} = params;
    return { action, type };
}