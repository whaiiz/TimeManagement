import Swal from "sweetalert2";

export const errorMessage = (title, message) => {
    return Swal.fire(title, message, 'error')
}

export const successMessage = (title, message) => {
    return Swal.fire(title, message, 'success')
}

export const deleteDialog = async (name) => {
    return Swal.fire({
        title: `Do you want to delete ${name}?`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
}