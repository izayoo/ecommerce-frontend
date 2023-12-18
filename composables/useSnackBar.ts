interface SnackBar {
    message: string
    show: boolean
    color: string
}

export const useSnackBar = () => {
    const snackBarState = useState<SnackBar>('snackBarState')

    function showSnackBar(message: string, color: string = 'green') {
        snackBarState.value = { show: true, message: message, color:color } as SnackBar
    }

    function closeSnackBar() {
        snackBarState.value.show = false
    }

    return {
        snackBarState,
        showSnackBar,
        closeSnackBar
    }
}
