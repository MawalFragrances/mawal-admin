export default function TableLoader() {
    return (
        <tbody className="divide-y-2 divide-white">
            {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                    <td colSpan={100} className="py-10 my-2 bg-gray-300 animate-pulse" />
                </tr>
            ))}
        </tbody>
    )
}