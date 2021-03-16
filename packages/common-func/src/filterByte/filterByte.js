const filterByte = (number, type) => {
    let response
    switch (type) {
        case 'Bits':
            response = number * 4
            break
        case 'KB':
            response = number / 1024
            break

        case 'MB':
            response = number / (1024 * 1024)
            break

        case 'GB':
            response = number / (1024 * 1024 * 1024)
            break

        default:
            if (number < 1024) {
                response = number + 'bytes'
            } else if (number < 1024 * 1024) {
                response = number / 1024 + 'KB'
            } else if (number < 1024 * 1024 * 1024) {
                response = number / (1024 * 1024) + 'MB'
            } else {
                response = number / (1024 * 1024 * 1024) + 'GB'
            }
            return response;
    }
    return response + type
}

export { filterByte }
