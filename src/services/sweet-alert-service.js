import Swal from "sweetalert2";

export const errorMessage = (title, message) => {
    return Swal.fire(title, message, 'error')
}