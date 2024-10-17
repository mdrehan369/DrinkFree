export default function DataFillForm({ params }: { params: { clientId: string } }) {
    return <div>
        hello fill data
        {params.clientId}
    </div>
}