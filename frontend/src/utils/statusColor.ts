export const statusBackgroudColor = (status?: string) => {
    switch (status) {
        case 'created':
            return 'bg-gray-200';
        case 'paid':
            return 'bg-blue-200';
        case 'void':
            return 'bg-red-200';
        case 'shipped':
            return 'bg-yellow-200';
        case 'complete':
            return 'bg-green-200';
        default:
            return 'error';
    }
}

export const statusColor = (status?: string) => {
    switch (status) {
        case 'created':
            return 'text-gray-900';
        case 'paid':
            return 'text-blue-900';
        case 'void':
            return 'text-red-900';
        case 'shipped':
            return 'text-yellow-900';
        case 'complete':
            return 'text-green-900';
        default:
            return 'error';
    }
}