export function useDownload() {
     function download (response: any) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: response.data.type }))
        const link = document.createElement('a')
        const contentDisposition = response.headers['content-disposition']

        let fileName = 'export'
        if (contentDisposition) {
            let fileNameMatch = contentDisposition.match(/filename="(.+)"/)
            if (!fileNameMatch) {
                fileNameMatch = contentDisposition.match(/filename=(.+)/)
                if (fileNameMatch.length === 2) { fileName = fileNameMatch[1] }
            } else if (fileNameMatch.length === 2) { fileName = fileNameMatch[1] }
        }
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)

        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)
    }

    return {
         download
    }
}